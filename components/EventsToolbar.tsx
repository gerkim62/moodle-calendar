import React from 'react';
import { sortBy } from './Events';
import RefreshButton from './RefreshButton';

type Props = {
    onSortChange: (sortBy: sortBy) => void;
};

const EventsToolbar = ({onSortChange}: Props) => {
  return (
    <div className="flex md:flex-row  flex-row items-center justify-center md:mb-0 test max-w-[90vw]">
      {/* <h1 className="text-2xl font-bold mb-4 hidden md:block ml-5">Events</h1> */}
      <div className="flex md:flex-row justify-between flex-row w-max-content max-w-[90vw] ">
        <select onChange={(e)=>onSortChange(e.target.value as sortBy)} className="border p-2 rounded-md mb-2 mx-auto w-[100%] max-w-[300px]">
          <option disabled selected value="">Sort By</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="date-desc">Date (Latest)</option>
          {/* <option value="category">Category</option> */}
        </select>
        <div className="flex flex-wrap justify-center mr-2 ml-4">
         <RefreshButton />
        </div>
      </div>
    </div>
  );
};

export default EventsToolbar;
