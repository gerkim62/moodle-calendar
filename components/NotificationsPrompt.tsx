"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const NotificationsPrompt: React.FC = () => {
  const { data: session, status } = useSession();
  const [notificationsSupported, setNotificationSupported] = useState(false);
  const [alreadyPrompted, setAlreadyPrompted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // overlay show state
  const [overlayShowing, setOverlayShowing] = useState(false);

  const [showing, setShowing] = useState(
    notificationsSupported &&
      !alreadyPrompted &&
      status === "authenticated" &&
      !subscribed
  );

  useEffect(() => {
    setNotificationSupported("Notification" in window);
    setAlreadyPrompted(
      localStorage.getItem("notifications-prompted") === "true"
    );

    console.log({ notificationsSupported, alreadyPrompted, status });

    const register = navigator.serviceWorker.getRegistration();

    register?.then((registration) => {
      if (!registration) return;
      registration.pushManager.getSubscription().then((subscription) => {
        if (!subscription) return;
        console.log("Already subscribed", subscription);
        setSubscribed(true);
      });
    });

    setShowing(
      notificationsSupported &&
        !alreadyPrompted &&
        status === "authenticated" &&
        !subscribed
    );
  }, [status, notificationsSupported, alreadyPrompted]);

  async function handleClick() {
    //show notification prompt
    let accepted = Notification.permission === "granted";

    if (!accepted) {
      setOverlayShowing(true);
      const choice = await Notification.requestPermission();
      setOverlayShowing(false);
      accepted = choice === "granted";
    }
    setShowing(false);

    if (accepted) {
      toast.dismiss();
      toast("Just a sec...");
      const subscription = await subscribePush().catch((error) => {
        console.log(error);
        toast.error("Failed to subscribe notifications. Please retry.");
        return;
      });

      if (!subscription)
        return toast.error("Can't generate notification subscription.");
      toast.dismiss();
      toast("It takes a sec...");
      const success = await saveSubscription(subscription).catch((error) => {
        console.error(error);
        toast.dismiss();
        toast.error("Failed to save subscription. Please retry.");
        return false;
      });

      if (success) setSubscribed(true);
      if (success) toast.success("Notifications enabled successfully");
      if (success) localStorage.setItem("notifications-prompted", "true");
      // else toast.error("Something went wrong");
    } else toast.error("Failed to enable notifications");

    if (Notification.permission !== "default" && subscribed)
      localStorage.setItem("notifications-prompted", "true");
  }

  async function subscribePush() {
    const publicVapidKey =
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
      "BHU8mT0M4T8l0n0kM5HME-IKFVqQlbsEbQDD5ihoWrb3QodZA5LAMoujrI7gmqvFxEv3n9oy0gmfE00Hhv4NI4w";
    if (!publicVapidKey) return console.log("VAPID key not found");

    console.log("Checking service worker registration...");
    const register = await navigator.serviceWorker.getRegistration();

    if (!register) {
      return console.log("Service worker not found");
    }
    if (!publicVapidKey) return console.log("VAPID key not found");
    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push Registered...");

    return subscription;
  }

  async function saveSubscription(subscription: PushSubscription) {
    const userId = (session?.user as any)?.id;
    if (!userId)
      throw new Error("No user id hence cannot save push subscription");
    const response = await fetch("/api/notifications/save-subscription", {
      method: "POST",
      body: JSON.stringify({
        subscription,
        userId,
      }),
    }).catch((error) => {
      console.error(error);
      throw new Error("Failed to get response when saving subscription");
    });

    if (!response.ok)
      throw new Error(
        "Server returned bad status code when saving subscription"
      );

    return true;
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (overlayShowing) {
    return (
      <div
        className={`fixed z-50 inset-0 overflow-hidden dark:bg-white bg-black opacity-20 ${
          overlayShowing ? "" : "hidden"
        }`}
      ></div>
    );
  }

  if (!showing) return null;

  return (
    <div
      id="notification-prompt"
      tabIndex={-1}
      className="fixed bottom-0 start-0 !z-48 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          <span
            onClick={handleClick}
            className="inline-flex p-1 animate-bounce bg-slate-200 me-3 rounded-full items-center justify-center text-blue-600 dark:text-blue-500"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
            <span className="sr-only">Enable Notifications</span>
          </span>
          <span>
            Receive notifications for new assignments, quizes etc without
            opening Calendify or eLearning.{" "}
            <button
              onClick={(e) => handleClick()}
              className="flex items-center ms-0 text-sm font-medium text-blue-600 md:ms-1 md:inline-flex dark:text-blue-500 hover:underline"
            >
              Enable Now{" "}
              <svg
                fill="currentColor"
                className="w-3 h-3 ms-2 rtl:rotate-180"
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
          onClick={() => {
            setShowing(false);
            // localStorage.setItem("notifications-prompted", "true");
            toast("You can enable notifications from the settings page.");
          }}
          data-dismiss-target="#notification-prompt"
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

export default NotificationsPrompt;
