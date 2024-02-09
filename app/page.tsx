import React from "react";
import Submit from "@/components/Submit";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma";

export const metadata = {
  title: "Calendify | Home",
  description:
    "eLearning Notifications for Assignments, Quizzes, Discussions and more.",
  keywords:
    "moodle, elearning, dashboard, calendar, events, ueab, university of eastern africa baraton",
};

const Homepage: React.FC = async () => {
  const session = await getServerSession();
  // throw 1;
  return (
    <div className="bg-gray-100 dark:bg-gray-900  flex justify-center my-4 py-4">
      <div className="max-w-lg my-6 mx-4">
        <h2 className="text-3xl font-extrabold dark:text-white">
          Simplify Your <span className="whitespace-nowrap">E-Learning</span>{" "}
          Experience
        </h2>

        <p className="my-4 text-lg text-gray-500 dark:text-gray-300">
          Calendify, created by{" "}
          <span className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              developer.gerison
            </span>
          </span>
          , scans your <span className="whitespace-nowrap">E-Learning</span>{" "}
          portal for due assignments, quizzes, discussions, and more and sends
          you a Notification immediately.
        </p>
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-300">
          Stay updated effortlessly! Setting up takes less than a minute.
        </p>
        {session && session.user ? (
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative flex justify-center items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                View my Events <FaArrowRight className="ml-2" />
              </span>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex space-x-4">
              <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                >
                  <span className="relative flex justify-center items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                    Create an Account <FaArrowRight className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
            <p className="my-4 dark:text-white text-gray-600">
              Already have an account?{" "}
              <>
                <Link
                  href="/signin"
                  className="text-purple-500 dark:text-purple-300 hover:underline"
                >
                  Login here
                </Link>
              </>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
