import EventDetails from "@/components/EventDetails";
import prisma from "@/libs/prisma";
import ical from "ical";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  params: { userid: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
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

  const fetchCalendar = async (user:{
    id: string;
    fullName: string;
    authToken: string;
    moodleUserId: string;
    domain: string;
    createdAt: Date;
    updatedAt: Date;
}) => {
    const { domain, moodleUserId, authToken } = user;
    const url =`https://${domain}/calendar/export_execute.php?userid=${moodleUserId}&authtoken=${authToken}&preset_what=all&preset_time=recentupcoming`
    console.log(url)
    const response = await fetch(url);
    const data = await response.text();
    // console.log(data);
    return data;
  };

  const calendarText = await fetchCalendar(user);
  const calendar = Object.values(ical.parseICS(calendarText));

  console.log(calendar);

  return <EventDetails calendarEvent={calendar[0]} />;
}
