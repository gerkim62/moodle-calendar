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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${dayOfWeek} ${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <div className="bg-white dark:bg-slate-900 shadow p-6 rounded-md border border-gray-200 dark:border-gray-700 relative">
      <h2 className="text-xl font-semibold mb-4">{event.summary?.replace(" is due", ".")}    {
        new Date(event.end || "").getTime() < new Date().getTime() &&<span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
        <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
        </svg>
        Overdue
        </span>
      }</h2>
      {/* {event.uid && (
        <form
          action={(data) => {
            console.log(data);
          }}
        >
          <input type="hidden" name="eventid" value={event.uid} />
          <button className="absolute top-2 right-2 text-red-300 dark:text-red-600 hover:text-red-600 dark:hover:text-red-400">
            <RiDeleteBinLine size={20} />
          </button>
        </form>
      )} */}
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        <strong>Due Date:</strong> {getDueDate()} ({formaDayAndTime(new Date(event.start || ""))})
      {/* overdue */}
   
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
              <button className="text-blue-500 dark:text-blue-400 ml-2 hover:underline dark:hover:underline" onClick={toggleDescription}>
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
