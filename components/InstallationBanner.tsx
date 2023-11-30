"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
const InstallationBanner: React.FC = () => {
  // overlay show state
  const [overlayShowing, setOverlayShowing] = useState(false);

  const [showing, setShowing] = useState(false);

  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handleBeforeInstallPrompt = (event: Event) => {
    // Prevent the default behavior to keep the event available for later use
    event.preventDefault();

    // Save the event for later use
    setDeferredEvent(event as BeforeInstallPromptEvent);

    setShowing(true);
  };

  console.log({ showing, overlayShowing });

  async function handleInstallClick() {
    if (deferredEvent) {
      setOverlayShowing(true);
      await deferredEvent.prompt();
      setOverlayShowing(false);
      setDeferredEvent(null);
    } else toast.error("Installation failed, please try again later!");

    setShowing(false);
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any)?.workbox !== undefined
    ) {
      const wb = (window as any)?.workbox;
      // add event listeners to handle PWA lifecycle events
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }
  }, []);

  if (overlayShowing) {
    return (
      <div
        className={`fixed z-50 inset-0 overflow-hidden dark:bg-white bg-black opacity-20 fade-in-20 ${
          overlayShowing ? "" : "hidden"
        }`}
      ></div>
    );
  }

  if (!showing) return null;

  return (
    <div
      id="bottom-banner"
      tabIndex={-1}
      className="fixed bottom-0 start-0 !z-49 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          <span
            onClick={handleInstallClick}
            className="inline-flex p-1 animate-bounce bg-slate-200 me-3 rounded-full items-center justify-center text-blue-600 dark:text-blue-500 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="0.625em"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
            </svg>

            <span className="sr-only">Offline Access</span>
          </span>
          <span>
            Enjoy faster, offline access by installing Calendify!{" "}
            <button
              onClick={(e) => handleInstallClick()}
              className=" flex items-center ms-0 text-sm font-medium text-blue-600 md:ms-1 md:inline-flex dark:text-blue-500 hover:underline"
            >
              Install Now{" "}
              <svg
                fill="currentColor"
                className="w-3 h-3 ms-2 rtl:rotate-180 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setShowing(false)}
          data-dismiss-target="#bottom-banner"
          type="button"
          className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </div>
  );
};

export default InstallationBanner;
