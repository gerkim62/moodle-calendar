import { getCalendarEvents } from "@/libs/getCalendarEvents";
import { getCalendarUrl } from "@/libs/getCalendarUrl";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import webpush from "web-push";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";

console.log(VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

webpush.setVapidDetails(
  "mailto:gerkim62@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
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
      return NextResponse.json(
        { message: "User has disabled push notifications" },
        { status: 204 }
      );
    }

    const subscriptions = user.pushSubscriptions;

    if (!subscriptions) {
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
      return NextResponse.json({ message: "no new event" }, { status: 204 });
    }
    type Notification = {
      title: string;
      userId: string;
      message: string;
      icon: string;
    };
    const notifications: Notification[] = [
      {
        title: `You have ${newEvents.length} new events.`,
        userId,
        message: `You have ${newEvents.length} new events. Click here to view them.`,
        icon: "/calendify-min.png",
      },
    ];

    if (preferedNotificationsType === "COLLECTIVE") {
      notifications.push({
        title: `You have ${newEvents.length} new events.`,
        userId,
        message: `You have ${newEvents.length} new events. Click here to view them.`,
        icon: "/calendify-min.png",
      });
    }

    if (preferedNotificationsType === "EACH") {
      notifications.push(
        ...newEvents.map((event) => ({
          title: event.summary ?? "New Event",
          userId,
          message: event.description ?? "New Event",
          icon: "/calendify-min.png",
        }))
      );
    }

    let failedNotificationsCount = 0;
    for (const notification of notifications) {
      for (const subscription of subscriptions) {
        await webpush
          .sendNotification(subscription as any, JSON.stringify(notification))
          .catch((err) => {
            console.error(err);
            failedNotificationsCount++;
          })
          .then(async () => {
            console.log("Notification sent");

            // Save the event id to the user's viewedEventIds
            try {
              await prisma.user.update({
                where: {
                  id: userId,
                },
                data: {
                  viewedEventIds: {
                    push: notification.userId,
                  },
                },
              });
            } catch (err) {
              console.error(err);
            }
          });
      }
    }

    // console.log(res);
    return NextResponse.json({
      success: true,
      failedNotifications: failedNotificationsCount,
      total: notifications.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
