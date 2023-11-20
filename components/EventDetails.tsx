import { CalendarComponent } from "ical";
import React from "react";

const EventDetails = ({
  calendarEvent,
}: {
  calendarEvent: CalendarComponent;
}) => {
  const {
    summary,
    start,
    end,
    description,
    categories,
    uid,
    lastmodified,
    dtstamp,
  } = calendarEvent;

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-semibold">{summary}</h3>
      <p>{description}</p>
      {/* <p>Start: {start}</p>
      <p>End: {end}</p> */}
      <p>Categories: {categories?.join(", ")}</p>
      <p>UID: {uid}</p>
      <p>Last Modified: {lastmodified?.toString()}</p>
      <p>Timestamp: {dtstamp?.toString()}</p>
      {/* ... (render other fields if needed) */}
    </div>
  );
};

export default EventDetails;
