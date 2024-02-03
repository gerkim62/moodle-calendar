import { CalendarComponent } from "ical";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Markdown from "react-markdown";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

interface EventProps {
  event: CalendarComponent;
}

const maxDescriptionLength = 50;

const EventItem: React.FC<EventProps> = ({ event }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "No date specified";
    return <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />;
  };

  const renderDescription = () => {
    if (!event.description) return "No description available";

    const maxLength = maxDescriptionLength;

    if (showFullDescription) {
      return event.description;
    } else {
      return truncateText(event.description, maxLength);
    }
  };

  const getDueDate = () => {
    if (!event.start || !event.end) return "No date specified";

    const startDate = new Date(event.start);

    return formatDate(startDate);
  };

  function formaDayAndTime(date: Date): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${dayOfWeek} ${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <div className="bg-white dark:bg-slate-900 shadow p-6 rounded-md border border-gray-200 dark:border-gray-700 relative">
      <h2 className="text-xl font-semibold mb-4">
        {event.summary?.replace(" is due", ".")}{" "}
        {new Date(event.end || "").getTime() < new Date().getTime() && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
            </svg>
            Overdue
          </span>
        )}
      </h2>
      {event.uid && (
        <form
          action={(data) => {
            console.log(data);
            const eventId = data.get("eventid");
            // alert(eventId);
          }}
        >
          <input type="hidden" name="eventid" value={event.uid} />
          <button
            type="submit"
            className="text-black dark:text-white opacity-60  focus:ring-emerald-300 hover:opacity-100 font-medium rounded-full text-sm p-1 absolute top-2 right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="20"
              viewBox="0 0 640 512"
              fill="currentColor"
            >
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
            </svg>
            <span className="sr-only">Hide Icon</span>
          </button>
        </form>
      )}
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <strong>Due Date:</strong> {getDueDate()} (
        {formaDayAndTime(new Date(event.start || ""))}){/* overdue */}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <strong>Last Modified:</strong>{" "}
        {event.lastmodified
          ? formatDate(new Date(event.lastmodified))
          : "No last modified date specified"}
      </p>
      <div className="text-gray-600 dark:text-gray-400 mb-4">
        <strong>Description:</strong>{" "}
        <span className="whitespace-pre-line">
          {renderDescription()}
          {event.description &&
            event.description.length > maxDescriptionLength && (
              <button
                className="text-blue-500 dark:text-blue-400 ml-2 hover:underline dark:hover:underline"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            )}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        <strong>Categories:</strong>{" "}
        {event.categories?.join(", ") || "No categories specified"}
      </p>
    </div>
  );
};

export default EventItem;
