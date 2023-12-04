import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';

import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumbs";
import { AuthProvider } from "@/providers/auth";
import LoginAlert from "@/components/LoginAlert";
import InstallationBanner from "@/components/InstallationBanner";
import NotificationsPrompt from "@/components/NotificationsPrompt";

// import * as PusherPushNotifications from "@pusher/push-notifications-web";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendify",
  description: `Calendify is a web application that helps you to manage your time and keep track of your events. It will give notifications for your moodle elearning  events.`,
  keywords: `Calendify, Sign In, Sign Up, Calendar, Events, Event, Event Management, Time Management, Time, Management, Calendar App, Calendar Application, Calendar Web App, Calendar Web Application, Calendar Web Application, Calendar Web Ap, moodle, moodle calendar, moodle calendify, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, elearning, elearning calendar, elearning calendify, elearning calendify app, elearning calendify application, elearning calendify web app, elearning calendify web application, elearning calendify web application, elearning calendify web ap, elearning calendify app, elearning calendify application, elearning calendify web app, elearning calendify web application, elearning calendify web application, elearning calendify web ap, moodle elearning, moodle elearning calendar, moodle elearning calendify, moodle elearning calendify app, moodle elearning calendify application, moodle elearning calendify web app, moodle elearning calendify web application, moodle elearning calendify web application, moodle elearning calendify web ap, moodle elearning calendify app, moodle elearning calendify application, moodle elearning calendify web app, moodle elearning calendify web application, moodle elearning calendify web application, moodle elearning calendify web ap`,
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
    {
      url: "/favicon.ico",
      rel: "shortcut icon",
      type: "image/x-icon",
    },
    {
      url: "/favicon.ico",
      rel: "apple-touch-icon",
      type: "image/x-icon",
    },

    // the  one that appears on whatsapp
    {
      url: "/favicon.ico",
      rel: "apple-touch-icon",
      type: "image/x-icon",
    },
    {
      url: "/favicon.ico",
      rel: "apple-touch-icon",
      type: "image/x-icon",
    },
  ],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  minimumScale: 1,
  maximumScale: 5,
  themeColor: "#a855f7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const beamsClient = new PusherPushNotifications.Client({
  //   instanceId: '3c5ea04c-91aa-4f31-812a-0fa22127a5f6',
  // });

  // beamsClient.start()
  //   .then(() => beamsClient.addDeviceInterest('hello'))
  //   .then(() => console.log('Successfully registered and subscribed!'))
  //   .catch(console.error);
  return (
    <html lang="en">
      <Script
        id="ad-script"
        strategy="afterInteractive"
         data-cfasync="false"
      >
        {`
          (function(){var k=window,r="c7096acef8d9efc61dbaf11ee5268f20",y=[["siteId", 550-155*641*212+26112693], ["minBid", 0], ["popundersPerIP", "0"], ["delayBetween", 0], ["default", false], ["defaultPerDay", 0], ["topmostLayer", !0]]; if (k[r]) return; try{k["_pop"]=y;Object.freeze(k["_pop"]);}catch(e){}; try{k[r]=y;Object.freeze(k[r]);}catch(e){}; var m=[atob("d3d3LmRpc3BsYXl2ZXJ0aXNpbmcuY29tL2FwaS9qcy92aXNpYmlsaXR5Lm1pbi5qcw=="),atob("ZDNtem9rdHk5NTFjNXcuY2xvdWRmcm9udC5uZXQvdmFuaWxsYS10aWx0Lm1pbi5qcw==")],o=0,z,b=function(){if((!m[o])||(((new Date()).getTime()>1727606836000)&&(o>1)))return;z=k["document"]["createElement"]("script"); z["type"]="text/javascript"; z["async"]=!0;var a=k["document"]["getElementsByTagName"]("script")[0]; z["src"]='https://'+m[o]; z["crossOrigin"]="anonymous"; z["onerror"]=function(){o++;b()}; a["parentNode"]["insertBefore"](z,a)}; b()})();`}
      </Script>
      <body className={"flex flex-col min-h-screen " + inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <Breadcrumb />
            <LoginAlert />
            <Toaster />
            <div className="flex-1">{children}</div>
            <InstallationBanner />
            <NotificationsPrompt />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
