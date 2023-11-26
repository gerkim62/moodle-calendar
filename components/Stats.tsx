import React from "react";

interface StatsProps {
  recentlyAddedCount: number;
  upcomingEventsCount: number;
  pastEventsCount: number;
}

const Stats: React.FC<StatsProps> = ({
  recentlyAddedCount,
  upcomingEventsCount,
  pastEventsCount,
}) => {
  return (
    <>
      <ul className="max-w-md w-[90vw] m-4 mx-auto flex flex-wrap justify-evenly text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2 border-b-4">
          <p className="text-2xl font-bold dark:text-white">
            {recentlyAddedCount}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Recently Added
          </p>
        </li>
        <li className="me-2">
          <p className="text-2xl font-bold dark:text-white">
            {recentlyAddedCount}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Recently Added
          </p>
        </li>
        <li className="me-2">
          <p className="text-2xl font-bold dark:text-white">
            {recentlyAddedCount}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Recently Added
          </p>
        </li>
      </ul>
    </>
  );
};

export default Stats;
