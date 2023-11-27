import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumbs";
import { AuthProvider } from "@/providers/auth";
import LoginAlert from "@/components/LoginAlert";

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
  manifest: "/manifest.json"
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
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
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
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
