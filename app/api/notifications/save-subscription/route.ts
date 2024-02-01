import createCronJob, { CronjobPayload } from "@/libs/createCronJob";
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

      select: {
        cronjobId: true,
        username: true,
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

    const payload: CronjobPayload = {
      url: pushTriggerUrl.toString(),
      title: `${user.username}'s Job`,
    };

    try {
      const existingCronjobId = user.cronjobId;
      let jobId;
      if (!existingCronjobId) {
        const result = await createCronJob(payload);
        jobId = result.jobId;
      } else {
        jobId = existingCronjobId;
      }

      // update user with the jobId
      const updatedUSer = await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          cronjobId: jobId,
        },
      });

      console.log(`Cron job created successfully: ${jobId}`);
    } catch (error) {
      console.error("Error creating cron job:", error);
      return NextResponse.json(
        { error, message: "Error creating cron job" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    return NextResponse.json(
      { error, message: "internal server error" },
      { status: 500 }
    );
  }
}
