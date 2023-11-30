// @ts-nocheck

import { precacheAndRoute } from "workbox-precaching";

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);

// Additional code goes here.

console.log("Service Worker Loaded...");

type PushData = {
  title: string;
  userId: string;
  message: string;
};

// @ts-nocheck
//listen for push
self.addEventListener("push", (e) => {
  const data = e.data?.json();
  console.log("Push Received...");

  const notificationPromise = self.registration.showNotification(data.title, {
    body: data.message,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });

  e.waitUntil(notificationPromise);
});
