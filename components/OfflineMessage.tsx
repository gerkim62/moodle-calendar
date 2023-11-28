"use client";

import { useState } from "react";

type Props = {};

const OfflineMessage = ({}: Props) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  //event listener for online and offline
  window.addEventListener("online", () => setIsOnline(true));
  window.addEventListener("offline", () => setIsOnline(false));

  if (isOnline) return null;

  return (
    <div
      className="max-w-md w-[90vw] m-4 mx-auto flex items-center p-4 py-2 mb-4 mt-0 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Oops! </span>You are offline. Please
        connect to the internet to view up-to-date information.
      </div>
    </div>
  );
};

export default OfflineMessage;
