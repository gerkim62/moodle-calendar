import React from 'react';
import { sortBy } from './Events';

type Props = {
    onSortChange: (sortBy: sortBy) => void;
};

const EventsToolbar = ({onSortChange}: Props) => {
  return (
    <div className="flex md:flex-row md:justify-between flex-col items-center justify-center md:mb-4">
      <h1 className="text-2xl font-bold mb-4 hidden md:block">Events</h1>
      <div className="flex md:flex-row md:justify-center flex-col ">
        <select onChange={(e)=>onSortChange(e.target.value as sortBy)} className="border p-2 rounded-md mb-2 mx-auto max-w-[300px]">
          <option value="">Sort By</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="date-desc">Date (Latest)</option>
          {/* <option value="category">Category</option> */}
        </select>
        {/* <div className="flex flex-wrap justify-center">
          <button className="border p-2 rounded-md mb-2 mx-1 w-32">All Events</button>
          <button className="border p-2 rounded-md mb-2 mx-1 w-32">Upcoming</button>
          <button className="border p-2 rounded-md mb-2 mx-1 w-32">Previous</button>
         
        </div> */}
      </div>
    </div>
  );
};

export default EventsToolbar;
