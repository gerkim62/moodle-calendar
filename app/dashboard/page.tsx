import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import LoginAlert from "@/components/LoginAlert";
import Stats from "@/components/Stats";
import authOptions from "../api/auth/[...nextauth]/options";
import prisma from "@/libs/prisma";
import Events from "@/components/Events";
import OfflineMessage from "@/components/OfflineMessage";
import { getCalendarUrl } from "@/libs/getCalendarUrl";
import { getCalendarEvents } from "../../libs/getCalendarEvents";
import { CALENDAR_ERRORS, CalendarErrors } from "../../libs/calendaErrors";

export const metadata = {
  title: "Dashboard",
  description:
    "View your Moodle elearning calendar events without having to log in to Moodle.",
  keywords:
    "moodle, elearning, dashboard, calendar, events, ueab, university of eastern africa baraton",
};

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session || !session.user) {
    redirect("/signin");
  }

  const id = (session.user as any).id;
  const name = (session.user as any).name;
  console.log(id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return <div>There was an error fetching your account. Sorry! Please logout then login again.</div>;
  }
  //  https://ielearning.ueab.ac.ke/calendar/export_execute.php?userid=10131&authtoken=167e3931aaedc0dffbcde1941b7a4224d93b1025&preset_what=all&preset_time=recentupcoming
  const moodleCalendarUrl = getCalendarUrl(user);
  console.log(moodleCalendarUrl)
  let events = [];
  try {
    if (!moodleCalendarUrl) {
      throw new Error(CALENDAR_ERRORS.INVALID_LINK);
    }
    events = await getCalendarEvents(moodleCalendarUrl);
    console.log(events);
  } catch (error) {
    const message = error as keyof CalendarErrors;
    console.log(error);
    // there was a problem getting the calendar events, use tailwind css
    return (
      <div className="max-w-md w-[90vw] m-4 mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
        There was a problem getting your calendar events. Please reload this
        page! <br />
        {message}
      </div>
    );
  }
  return (
    <div>
      <OfflineMessage />
      <Events events={events} />
    </div>
  );
};

export default page;
