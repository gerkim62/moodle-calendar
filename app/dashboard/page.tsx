import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import ical from "ical";
import LoginAlert from "@/components/LoginAlert";
import Stats from "@/components/Stats";
import authOptions from "../api/auth/[...nextauth]/options";
import prisma from "@/libs/prisma";
import Events from "@/components/Events";

type CalendarErrors = {
  CONTENT_TYPE: string;
  FETCH_ERROR: string;
  INVALID_LINK: string;
  PARSE_ERROR: string;
};

const CALENDAR_ERRORS: CalendarErrors = {
  CONTENT_TYPE: "Calendar link returns invalid content type",
  FETCH_ERROR: "Error fetching calendar events",
  INVALID_LINK: "Invalid calendar link",
  PARSE_ERROR: "Error parsing calendar events",
};
 async function getCalendarEvents(calendarLink: string) {
  //check if calendar link is valid
  if (!calendarLink) {
    throw new Error(CALENDAR_ERRORS.INVALID_LINK);
  }

  const res = await fetch(calendarLink).catch(() => {
    throw new Error(CALENDAR_ERRORS.FETCH_ERROR);
  });

  //check if content type is text/calendar
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/calendar")) {
    throw new Error(CALENDAR_ERRORS.CONTENT_TYPE);
  }

  const text = await res.text().catch(() => {
    throw new Error(CALENDAR_ERRORS.PARSE_ERROR);
  });

  try {
    const data = ical.parseICS(text);

    const events = Object.values(data);

    console.log(events);

    return events;
  } catch (error) {
    throw new Error(CALENDAR_ERRORS.PARSE_ERROR);
  }
}

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
    return <div>Something went wrong. Sorry!</div>;
  }
  //  https://ielearning.ueab.ac.ke/calendar/export_execute.php?userid=10131&authtoken=167e3931aaedc0dffbcde1941b7a4224d93b1025&preset_what=all&preset_time=recentupcoming
  const moodleCalendarUrl = `https://${user.domain}/calendar/export_execute.php?userid=${user.moodleUserId}&authtoken=${user.authToken}&preset_what=all&preset_time=recentupcoming`;
let events = [];
  try {
    events =await getCalendarEvents(moodleCalendarUrl);
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
      <LoginAlert username={name} />

      <Events events={events} />
    </div>
  );
};

export default page;
