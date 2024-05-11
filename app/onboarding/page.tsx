import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import CustomLink from "@/components/CustomLink";

interface WelcomeProps {
  searchParams: { username: string; from: string };
}

const Welcome: React.FC<WelcomeProps> = async ({ searchParams }) => {
  const username = searchParams.username;

  const session = await getServerSession(authOptions);

  if (session && session.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-3xl font-bold mb-4">Account Created Successfully!</h1>
      {searchParams.from === "signup" && (
        <p className="text-lg mb-6">
          You can now log in with your new account.
        </p>
      )}
      {username && (
        <p className="text-lg mb-6">
          Welcome, {username}! Click the button below to log in.
        </p>
      )}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center">
        <CustomLink
          href="/signin"
          className="w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0 relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative flex justify-center items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
            Login Now <FaArrowRight />
          </span>
        </CustomLink>
      </div>
    </div>
  );
};

export default Welcome;
