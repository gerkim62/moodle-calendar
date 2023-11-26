"use client";

import React, { useState } from "react";
import { CalendarComponent } from "ical";
import EventItem from "./EventItem";
import { Pagination } from "./Pagination";
import EventsToolbar from "./EventsToolbar";

type Props = {
  events: CalendarComponent[];
};

export type sortBy = "date-asc" | "date-desc" | "category";

const Events: React.FC<Props> = ({ events }) => {
  const eventsPerPage = 6; // Number of events to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<sortBy>("date-desc"); // Initial sort state

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  // Handling null values for start and category properties
  const sortedEvents = events.sort((a, b) => {
    if (!a.start || !b.start) return 0;

    if (currentSort === "date-desc") {
      return new Date(b.start).getTime() - new Date(a.start).getTime();
    } else if (currentSort === "date-asc") {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    } else if (
      currentSort === "category" &&
      typeof a.category === "string" &&
      typeof b.category === "string"
    ) {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (sortBy: sortBy) => {
    setCurrentSort(sortBy); // Update the current sort state
    setCurrentPage(1); // Reset to the first page when sort changes
  };

  return (
    <>
      <EventsToolbar onSortChange={handleSortChange} />
      <div className="container mx-auto px-4 py-2 max-w-[95vw]">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentEvents.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No events to show.
            </div>
          )}
          {currentEvents.map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </div>
      </div>
      <Pagination
        onPageChange={onPageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};

export default Events;
