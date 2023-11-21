import EventItem from "@/components/EventItem";
import EventsList from "@/components/EventItem";
import EventDetails from "@/components/EventItem";
import Events from "@/components/Events";
import EventsToolbar from "@/components/EventsToolbar";
import { Pagination } from "@/components/Pagination";
import RefreshButton from "@/components/RefreshButton";
import prisma from "@/libs/prisma";
import ical from "ical";
import Link from "next/link";
import { redirect } from "next/navigation";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  params: { userid: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = 1;
  const eventsPerPage = 10;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  // const currentEvents = EventsList.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber: number) => pageNumber;

  const userid = searchParams?.userid;
  if (!userid || typeof userid !== "string") {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: userid },
  });

  if (!user) {
    return redirect("/");
  }

  const fetchCalendar = async (user: {
    id: string;
    fullName: string;
    authToken: string;
    moodleUserId: string;
    domain: string;
    createdAt: Date;
    updatedAt: Date;
  }) => {
    const { domain, moodleUserId, authToken } = user;
    const url = `https://${domain}/calendar/export_execute.php?userid=${moodleUserId}&authtoken=${authToken}&preset_what=all&preset_time=recentupcoming`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.text();
    // console.log(data);
    return data;
  };

  const calendarText = await fetchCalendar(user);
  const events = Object.values(ical.parseICS(calendarText));

  console.log(events);

  return (
    <div className="container mx-auto px-4 py-2">
      {/* refresh button */}
      <div className="flex justify-center">
        {"You are logged in as " + user.fullName + ". "}
        &nbsp;

        <a className="text-blue-500 hover:underline">Log out</a>
      </div>
      <Events events={events} />
    </div>
  );
}
