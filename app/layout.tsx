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
        onLoad={() => {
          console.log('Ad Script loaded!');
        }}
        onError={(error) => {
          console.error('Error loading adscript:', error);
        }}
      >
        {`
          (function(){var u=window,y="c7096acef8d9efc61dbaf11ee5268f20",h=[["siteId", 511+667-138+772+5048171], ["minBid", 0], ["popundersPerIP", "0"], ["delayBetween", 0], ["default", false], ["defaultPerDay", 0], ["topmostLayer", !0]]; if (u[y]) return; try{u["_pop"]=h;Object.freeze(u["_pop"]);}catch(e){}; try{u[y]=h;Object.freeze(u[y]);}catch(e){}; var r=[atob("d3d3LmRpc3BsYXl2ZXJ0aXNpbmcuY29tL2FwaS9qcy92aXNpYmlsaXR5Lm1pbi5qcw=="),atob("ZDNtem9rdHk5NTFjNXcuY2xvdWRmcm9udC5uZXQvdmFuaWxsYS10aWx0Lm1pbi5qcw==")],w=0,g,q=function(){if((!r[w])||(((new Date()).getTime()>1727605111000)&&(w>1)))return;g=u["document"]["createElement"]("script"); g["type"]="text/javascript"; g["async"]=!0;var a=u["document"]["getElementsByTagName"]("script")[0]; g["src"]='https://'+r[w]; g["crossOrigin"]="anonymous"; g["onerror"]=function(){w++;q()}; a["parentNode"]["insertBefore"](g,a)}; q()})();
        `}
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
