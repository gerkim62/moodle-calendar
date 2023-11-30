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

// @ts-ignore
//listen for push
self.addEventListener("push", (e: PushEvent) => {
  const data:PushData = e.data?.json();
  console.log("Push Recieved...");
  (self as any).registration.showNotification(data.title, {
    body: data.message,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
