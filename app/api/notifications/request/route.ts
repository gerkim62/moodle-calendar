import { getCalendarEvents } from "@/libs/getCalendarEvents";
import { getCalendarUrl } from "@/libs/getCalendarUrl";
import prisma from "@/libs/prisma";
import { CalendarComponent } from "ical";
import { NextResponse } from "next/server";
import webpush from "web-push";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";

// console.log(VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

webpush.setVapidDetails(
  "mailto:gerkim62@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const id = "6b271f1c-d582-464c-a47c-731406cf79b0";
  // remove viewd event ids, and push subscriptions
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      viewedEventIds: {
        set: [],
      },
    },
  });
  try {
    // Get pushSubscription object
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (typeof userId !== "string") {
      return NextResponse.json(
        { error: "The query param userId is required" },
        { status: 400 }
      );
    }

    //get user with the subscrition according to the above params
    console.log(`Getting user with id ${userId}`);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        pushSubscriptions: true,
        moodleAuthToken: true,
        moodleUserId: true,
        domain: true,
        viewedEventIds: true,
        settings: {
          select: {
            preferedNotificationsType: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const preferedNotificationsType = user.settings?.preferedNotificationsType;

    if (preferedNotificationsType === "NONE") {
      return NextResponse.json({
        message: "User has disabled push notifications",
      });
    }

    const subscriptions = user.pushSubscriptions;

    if (!subscriptions.length) {
      return NextResponse.json(
        { error: "User push subscription not found" },
        { status: 404 }
      );
    }

    console.log(subscriptions);

    if (!subscriptions) {
      return NextResponse.json(
        { error: "No push subscription found for this user" },
        { status: 404 }
      );
    }

    // Create payload
    const calendarUrl = getCalendarUrl(user);
    if (!calendarUrl) {
      return NextResponse.json(
        { error: "Could not get calendar link" },
        { status: 500 }
      );
    }

    console.log(`Getting events from ${calendarUrl}`);
    const newEvents = (await getCalendarEvents(calendarUrl)).filter(
      (event) => !user.viewedEventIds.includes(event.uid ?? "")
    );

    if (newEvents.length === 0) {
      return NextResponse.json({ message: "no new event" });
    }

    type Notification = {
      title: string;
      userId: string;
      message: string;
      icon: string;
      id: string;
      type: "COLLECTIVE" | "EACH";
    };
    // Function to prepare collective notification
    function prepareCollectiveNotification(
      newEvents: CalendarComponent[]
    ): Notification {
      if (!userId) throw new Error("No userId");
      return {
        title: `You have ${newEvents.length} new events.`,
        userId,
        message: `You have ${newEvents.length} new events. Click here to view them.`,
        icon: "/calendify-min.png",
        id: newEvents.map((event) => event.uid ?? "").join(","),
        type: "COLLECTIVE",
      };
    }

    // Function to prepare individual notifications for each event
    function prepareIndividualNotifications(
      newEvents: CalendarComponent[]
    ): Notification[] {
      if (!userId) throw new Error("No userId");
      return newEvents.map((event) => ({
        title: event.summary ?? "New Event",
        userId,
        message: event.description ?? "New Event",
        icon: "/calendify-min.png",
        id: event.uid ?? "",
        type: "EACH",
      }));
    }

    // Function to update user's viewedEventIds
    async function updateUserViewedEventIds(eventIds: string[]) {
      if (!userId) throw new Error("No userId");
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          viewedEventIds: {
            push: eventIds,
          },
        },
      });
    }

    // Usage:

    const notifications: Notification[] = [];

    if (preferedNotificationsType === "COLLECTIVE") {
      const collectiveNotification = prepareCollectiveNotification(newEvents);
      notifications.push(collectiveNotification);
    }

    if (preferedNotificationsType === "EACH") {
      const individualNotifications = prepareIndividualNotifications(newEvents);
      notifications.push(...individualNotifications);
    }

    console.log(`Sending ${notifications.length} notifications`);

    async function sendNotification(
      notification: Notification,
      subscription: any
    ) {
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify(notification)
        );
        return { success: true, type: notification.type, id: notification.id };
      } catch (err) {
        console.error(err);
        return { success: false };
      }
    }

    async function sendNotifications(
      notifications: Notification[],
      subscriptions: any[]
    ) {
      const notificationPromises = [];

      for (let i = 0; i < notifications.length; i++) {
        for (let j = 0; j < subscriptions.length; j++) {
          notificationPromises.push(
            sendNotification(notifications[i], subscriptions[j])
          );
        }
      }

      const res = await Promise.all(notificationPromises);

      const failedNotificationsCount = res.filter((r) => !r.success).length;

      // where success is true return the id
      const successIds =
        preferedNotificationsType === "EACH"
          ? res.filter((r) => r.success).map((r) => r.id)
          : newEvents.map((event) => event.uid ?? "");

      await updateUserViewedEventIds(successIds as string[]);
      console.log(`Added new events to viewedEventIds, ${successIds.length}`);

      return {
        total: notificationPromises.length,
        failed: failedNotificationsCount,
      };
    }

    const { total, failed } = await sendNotifications(
      notifications,
      subscriptions
    );

    // console.log(res);
    return NextResponse.json({
      failed,
      total,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
