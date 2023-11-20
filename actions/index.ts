"use server";

// @ts-ignore-next-line
import psl from "psl";

import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";

async function calendarLinkSubmit(data: FormData) {
  const calendarLink = data.get("link");
  const fullName = data.get("fullname");
  if (typeof calendarLink !== "string") {
    console.log(calendarLink);  
    throw new Error("Invalid link");
  }
  const url = new URL(calendarLink);

  const params = new URLSearchParams(url.search);

  const authToken = params.get("authtoken");
  const userId = params.get("userid");

  const domain = url.hostname 
  
  //intended to use domain name but changed to hostname to retain the subdomain too
  //psl.parse(url.hostname)?.domain ?? null;

  if (domain === null) {
    throw new Error("Invalid domain");
  }

  if (typeof domain !== "string") {
    console.log(domain);
    throw new Error("Invalid domain");
  }

  if (authToken === null) {
    throw new Error("Invalid auth token");
  }

  if (userId === null) {
    throw new Error("Invalid user id");
  }

  const user = await prisma.user.findUnique({
    where: {
      moodleUserId_domain: {
        domain,
        moodleUserId: userId,
      },
    },
    select: {
      authToken: true,
      id: true,
    },
  });

  if(fullName && !user && typeof fullName === "string"){
    const user = await prisma.user.create({
      data: {
        moodleUserId: userId,
        domain,
        authToken,
        fullName
      },
    });

    return redirect(
      `/dashboard?userid=${user.id}`
    );
  }

  if (user === null) {
    return redirect(
      `/onboarding?domain=${domain}&authtoken=${authToken}&moodleuserid=${userId}`
    );
  }

  if (user.authToken !== authToken) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        authToken,
      },
    });
  }

  return redirect(
    `/dashboard?userid=${user.id}`
  );
}

export { calendarLinkSubmit };
