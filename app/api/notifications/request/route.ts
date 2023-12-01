import { getCalendarEvents } from "@/libs/getCalendarEvents";
import { getCalendarUrl } from "@/libs/getCalendarUrl";
import prisma from "@/libs/prisma";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { CalendarComponent } from "ical";
import { NextResponse } from "next/server";
import webpush, { SendResult, WebPushError } from "web-push";

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
  // for testing alone
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

    const preferedNotificationsType =
      user.settings?.preferedNotificationsType ?? "EACH";

    console.log(`User preferedNotificationsType: ${preferedNotificationsType}`);

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
      console.log("Preparing collective notification");
      const collectiveNotification = prepareCollectiveNotification(newEvents);
      notifications.push(collectiveNotification);
    }

    if (preferedNotificationsType === "EACH") {
      console.log("Preparing individual notifications");
      const individualNotifications = prepareIndividualNotifications(newEvents);
      notifications.push(...individualNotifications);
    }

    console.log(`Sending ${notifications.length} notifications`);

    async function sendNotification(
      notification: Notification,
      subscription: any
    ) {
      let result: WebPushError | SendResult;
      try {
        result = await webpush.sendNotification(
          subscription,
          JSON.stringify(notification)
        );
        return { success: true, notification, result };
      } catch (err) {
        console.error(err);
        if ((err as WebPushError)?.name === "WebPushError") {
          if ((err as WebPushError).statusCode === 410) {
            // we need to remove this subscription as it is gone
            const oldUser = await prisma.user.findUnique({
              where: {
                id: userId as string,
              },
              select: {
                pushSubscriptions: true,
              },
            });

            const subscriptionId = subscription.id;
            if (oldUser?.pushSubscriptions) {
              const newSubscriptions = oldUser.pushSubscriptions.filter(
                (sub) => (sub as JsonObject)?.id !== subscriptionId
              );

              const updatedUser = await prisma.user.update({
                where: {
                  id: userId as string,
                },
                data: {
                  pushSubscriptions: {
                    set: newSubscriptions as any,
                  },
                },
              });

              console.log(newSubscriptions);
            }
          }
        }
        return { success: false, notification, result: err };
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

      const results = await Promise.all(notificationPromises);

      const failedNotificationsCount = results.filter((r) => !r.success).length;

      // where success is true return the id
      const successIds =
        preferedNotificationsType === "EACH"
          ? results.filter((r) => r.success).map((r) => r.notification.id)
          : newEvents.map((event) => event.uid ?? "");

      await updateUserViewedEventIds(successIds as string[]);
      console.log(`Added new events to viewedEventIds, ${successIds.length}`);

      return {
        total: notificationPromises.length,
        failed: failedNotificationsCount,
        results,
      };
    }

    const result = await sendNotifications(notifications, subscriptions);

    // console.log(res);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
