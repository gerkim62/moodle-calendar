import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-800">
      <div className="border-t-4 border-blue-500 rounded-full animate-spin h-14 w-14 mr-3"></div>
      <span className="text-xl font-semibold text-blue-500 dark:text-blue-300">
        Loading...
      </span>
    </div>
  );
}
