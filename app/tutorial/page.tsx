import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Calendify | University Selection",
  description: `Select your university to continue`,
  keywords: `Calendify, Sign In, Sign Up, Calendar, Events, Event, Event Management, Time Management, Time, Management, Calendar App, Calendar Application, Calendar Web App, Calendar Web Application, Calendar Web Application, Calendar Web Ap, moodle, moodle calendar, moodle calendify, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap`,
};

const UniversitySelection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md max-w-md w-[90vw] m-4 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Select Your University</h2>
      <div className="flex flex-col space-y-4">
        <Link
          href="/tutorial/ueab"
          className="bg-blue-500 text-white py-2 px-4 rounded-md text-center transition duration-300 hover:bg-blue-600"
        >
          I&quot;m from UEAB
        </Link>
        <Link
          href="/tutorial/other"
          className="bg-green-500 text-white py-2 px-4 rounded-md text-center transition duration-300 hover:bg-green-600"
        >
          I&quot;m from another university
        </Link>
      </div>
    </div>
  );
};

export default UniversitySelection;
