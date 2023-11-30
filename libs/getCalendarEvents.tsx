import ical from "ical";
import { CALENDAR_ERRORS } from "@/libs/calendaErrors";

export async function getCalendarEvents(calendarLink: string) {
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

    console.log(events.length + " events in calendar");

    return events;
  } catch (error) {
    throw new Error(CALENDAR_ERRORS.PARSE_ERROR);
  }
}
