import React from "react";

export const metadata = {
  title: "Calendify | Calendar Instructions",
  description: `Instructions on how to get calendar link from your university's eLearning platform`,
  keywords: `Calendify, Sign In, Sign Up, Calendar, Events, Event, Event Management, Time Management, Time, Management, Calendar App, Calendar Application, Calendar Web App, Calendar Web Application, Calendar Web Application, Calendar Web Ap, moodle, moodle calendar, moodle calendify, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap`,
};

const CalendarInstructions: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6  max-w-xl w-[90vw] m-4 mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        How to Get Calendar Link from Your University&quot;s eLearning Platform
      </h2>
      <ol className="list-decimal pl-6">
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 1: Log in to Your University&quot;s eLearning Platform
          </h3>
          <p>
            Access your university&quot;s eLearning platform by logging in using
            your provided credentials.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 2: Find the Calendar Export Section
          </h3>
          <p>
            Explore the platform to locate the calendar export feature. It might
            be under the calendar, events, or settings section.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 3: Choose Export or Share Options
          </h3>
          <p>
            Look for options related to exporting or sharing the calendar. It
            could be labeled as &quot;Export Calendar&quot;, &quot;Share Calendar&quot;, or similar.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 4: Select Date Range and Event Types
          </h3>
          <p>
            Choose the date range and event types you want to include in the
            exported calendar according to what is displayed on the screen.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 5: Generate Calendar URL
          </h3>
          <p>
            After configuring your preferences, generate the calendar URL. It
            should be displayed on the screen or available for copying. Ensure
            the URL begins with{" "}
            <span className="text-green-500 dark:text-green-400">https://</span>{" "}
            and has relevant parameters.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 6: Copy the Calendar URL
          </h3>
          <p>
            Copy the generated URL correctly, starting from{" "}
            <span className="text-green-500 dark:text-green-400">https://</span>{" "}
            up to any specific parameters provided for date ranges or event
            types.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default CalendarInstructions;
