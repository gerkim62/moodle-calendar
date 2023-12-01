// @ts-nocheck

import { precacheAndRoute } from "workbox-precaching";

// @ts-ignore
// precacheAndRoute(self.__WB_MANIFEST);

console.log("Service Worker Loaded...");
type PushData = {
  title: string;
  userId: string;
  message: string;
};

self.addEventListener("push", (e: ExtendableEvent) => {
  console.log("Push Received...");
  const data: PushData | undefined = e?.data?.json();

  if (!data || !data.title || !data.message) {
    console.error("Push notification data is invalid:", data);
    return;
  }

  console.log("Push Received...");

  const notificationPromise = self.registration.showNotification(data.title, {
    body: data.message,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });

  e.waitUntil(notificationPromise);
});
