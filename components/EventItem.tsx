"use client";

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
    // console.log(date);
    if (!date) return "No date specified";
    return <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />;
    console.log(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC", // Set your desired timezone
    };
    // return new Date(date).toLocaleString("en-UK", options);
    // Adjust the locale and options as needed for your date format
  };

  const renderDescription = () => {
    if (!event.description) return "No description available";

    const maxLength = maxDescriptionLength; // Set your desired maximum length for description

    if (showFullDescription) {
      return event.description;
    } else {
      return truncateText(event.description, maxLength);
    }
  };

  const getDueDate = () => {
    if (!event.start || !event.end) return "No date specified";

    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

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
    <div className="bg-white shadow p-4 rounded-md border border-gray-200 overflow-auto relative">
      <h2 className="text-lg font-semibold mb-2">{event.summary}</h2>
      {event.uid && (
        <form
          action={(data) => {
            console.log(data);
          }}
        >
          <input type="hidden" name="eventid" value={event.uid} />
          <button className="absolute hover:text-red-600 top-2 right-2 text-red-300 cursor-pointer">
            <RiDeleteBinLine size={20} /> {/* Use the delete icon */}
          </button>
        </form>
      )}
      {/* due date as a range of start and end or simply "Due On" */}
      <p suppressHydrationWarning  className="text-gray-600 mb-2">
        <strong>Due Date:</strong>  {getDueDate()}  ({formaDayAndTime(new Date(event.start || ""))})
      </p>
      {/* added on */}
      {/* <p className="text-gray-600 mb-2">
        <strong>Created On:</strong>{" "}
        {event.dtstamp
          ? formatDate(new Date(event.dtstamp))
          : "No added on date specified"}
      </p> */}
      {/* last modified */}
      <p className="text-gray-600 mb-2">
        <strong>Last Modified:</strong>{" "}
        {event.lastmodified
          ? formatDate(new Date(event.lastmodified))
          : "No last modified date specified"}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Description:</strong> {renderDescription()}
        {event.description &&
          event.description.length > maxDescriptionLength && (
            <button className="text-blue-500" onClick={toggleDescription}>
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}
      </p>
      <p className="text-gray-600">
        <strong>Categories:</strong>{" "}
        {event.categories?.join(", ") || "No categories specified"}
      </p>
    </div>
  );
};

export default EventItem;
