"use server";
import bcrypt from "bcrypt";
// this one is for extracting the domain from the url but for now the full domain will be used instead
// @ts-ignore-next-line
// import psl from "psl";

import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";

async function signupFormSubmit(data: FormData) {
  const calendarLink = data.get("calendar-link");
  console.log(calendarLink);
  const encodedCalendarLink = encodeURIComponent(
    (typeof calendarLink === "string" && calendarLink) || ""
  );
  console.log(encodedCalendarLink);
  const username = data.get("username");
  const password = data.get("password");
  const confirmPassword = data.get("confirm-password");

  const paramsString = `username=${username}&password=${password}&link=${encodedCalendarLink}`;

  if (typeof calendarLink !== "string") {
    console.log(calendarLink);
    // throw new Error("You entered Invalid link");
    redirect("/signup?linkError=You entered an invalid link&" + paramsString);
  }
  const url = new URL(calendarLink.trim());

  const params = new URLSearchParams(url.search);

  const moodleAuthToken = params.get("authtoken");
  const moodleUserId = params.get("userid");

  const domain = url.hostname;

  if (typeof domain !== "string") {
    console.log(domain);
    // throw new Error("You entered an invalid link");
    redirect("/signup?linkError=You entered an invalid link&" + paramsString);
  }

  if (!moodleAuthToken || !moodleUserId) {
    // throw new Error("You entered incomplete link");
    redirect("/signup?linkError=You entered incomplete link&" + paramsString);
  }

  //checking if the user with this link is already in the database
  const userWithSameLink = await prisma.user.findUnique({
    where: {
      moodleUserId_domain: {
        domain,
        moodleUserId: moodleUserId,
      },
    },
    select: {
      moodleAuthToken: true,
      id: true,
    },
  });

  if (userWithSameLink) {
    // throw new Error("You are already registered");
    redirect(
      "/signup?linkError=An account with this link already exists. Please login instead!&" +
        paramsString
    );
  }

  if (
    typeof username !== "string" ||
    !username.trim().match(/^[a-zA-Z0-9_.-]{3,20}$/)
  ) {
    console.log(username);
    // throw new Error("You entered an invalid username");
    redirect(
      "/signup?usernameError=You entered an invalid username&" + paramsString
    );
  }

  const userWithSameUsername = await prisma.user.findUnique({
    where: {
      username: username.trim().toLowerCase(),
    },
  });

  if (password !== confirmPassword) {
    // throw new Error("Passwords do not match");
    redirect("/signup?passwordError=Passwords do not match&" + paramsString);
  }

  if (typeof password !== "string" || password.length < 4) {
    // throw new Error("");
    redirect(
      "/signup?passwordError=Password must be atleast 4 characters long&" +
        paramsString
    );
  }

  if (userWithSameUsername) {
    // throw new Error("Username already taken");
    redirect("/signup?usernameError=Username already taken&" + paramsString);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: username.toLowerCase().trim(),
      password: hashedPassword,
      domain,
      moodleUserId,
      moodleAuthToken,
    },
  });

  redirect("/onboarding?from=signup&username=" + username);
}

export { signupFormSubmit };
