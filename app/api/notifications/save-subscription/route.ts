import createCronJob from "@/libs/createCronJob";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subscription, userId } = await req.json();

    console.log(subscription);

    if (!subscription) {
      return NextResponse.json(
        { error: "No subscription provided" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "No userId provided" },
        { status: 400 }
      );
    }

    // update user with the subscription
    const user = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        pushSubscriptions: {
          push: subscription,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with the given userId" },
        { status: 404 }
      );
    }

    const pushTriggerUrl = new URL(
      "/api/notifications/request?userId=" + userId,
      req.url
    );

    console.log(`Creating cron job for ${pushTriggerUrl.toString()}`);

    await createCronJob(pushTriggerUrl.toString());

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    return NextResponse.json(
      { error, message: "internal server error" },
      { status: 500 }
    );
  }
}
