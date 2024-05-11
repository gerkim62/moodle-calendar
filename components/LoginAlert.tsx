"use client";

import React from "react";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CustomLink from "./CustomLink";

type Props = {};

const LoginAlert = ({}: Props) => {
  // const session = await getServerSession();

  const { data: session, status } = useSession();

  if (!session || !session.user) {
    return (
      <div
        className="max-w-md w-[90vw] m-4 mx-auto flex items-center p-4 py-2 mb-4 mt-0 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium"></span>You are not logged in.{" "}
          <>
            <CustomLink href="/signin" className="text-blue-600 hover:underline">
              Login here
            </CustomLink>
          </>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-md w-[90vw] m-4 mx-auto flex items-center p-4 py-2 mb-4 mt-0 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium"> </span>You are logged in as{" "}
        {session.user.name}. <LogoutButton />
      </div>
    </div>
  );
};

export default LoginAlert;
