"use client";

import React from "react";

const OfflinePage = () => {
  const [onlineStatus, setOnlineStatus] = React.useState(true);

  React.useEffect(() => {
    setOnlineStatus(navigator.onLine);

    const handleOnline = () => {
      setOnlineStatus(true);
    };

    const handleOffline = () => {
      setOnlineStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex justify-center items-center max-w-md w-[90vw] m-4  mx-auto">
      <div className="max-w-lg text-center p-4">
        {!onlineStatus && (
          <>
            <h2 className="text-4xl font-extrabold dark:text-white">
              You&apos;re Offline
            </h2>
            <p className="my-4 text-lg text-gray-500 dark:text-gray-300">
              Uh oh! It seems you are not connected to the internet.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-300">
              Please check your internet connection and try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflinePage;
