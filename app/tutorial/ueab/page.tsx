import React from "react";

export const metadata = {
  title: "Calendify | UEAB Moodle Calendar Link Instructions",
  description: `Instructions on how to get calendar link from your university's eLearning platform`,
  keywords: `Calendify, Sign In, Sign Up, Calendar, Events, Event, Event Management, Time Management, Time, Management, Calendar App, Calendar Application, Calendar Web App, Calendar Web Application, Calendar Web Application, Calendar Web Ap, moodle, moodle calendar, moodle calendify, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap, moodle calendify app, moodle calendify application, moodle calendify web app, moodle calendify web application, moodle calendify web application, moodle calendify web ap`,
};
const CalendarInstructions: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-xl w-[90vw] m-4 mx-auto">
      <h2 className="text-xl font-semibold mb-4">How to Get Calendar Link</h2>

      <ol className="list-none pl-6">
        <li >
          <p
            className="
          text-sm italic mb-4 text-gray-600 dark:text-gray-400 
          "
          >
            This tutorial is easy to follow.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 1: Log in to UEAB eLearning
          </h3>

          <p>
            To begin, access the UEAB eLearning platform by logging in using
            your credentials. (use iCampus to login to eLearning)
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 2: Access the Calendar Export Link
          </h3>
          <p
            className="
            mb-4 text-sm text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 dark:border-blue-400 p-2 rounded-lg bg-blue-50 dark:bg-blue-900 
          "
          >
            Note: Please Do not click on the link below until you have logged in
            to the UEAB eLearning platform. Please use iCampus to login to
            eLearning. If you are not logged in, the link will not work.
          </p>
          <p>
            After logging in, Click on this UEAB eLearning Calendar link:{" "}
            <a
              href="https://ielearning.ueab.ac.ke/calendar/export.php?"
              className="text-blue-500 dark:text-blue-400 underline hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ielearning.ueab.ac.ke/calendar/export.php
            </a>{" "}
            to proceed to the calendar export page.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 3: Select &quot;All Events&quot;
          </h3>
          <p>
            Once on the calendar export page, choose the option that says
            &quot;All Events&quot;.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 4: Choose &quot;Recent and Next 60 Days&quot;
          </h3>
          <p>
            After selecting &quot;All Events&quot;, pick the &quot;Recent and
            next 60 days&quot; option from the provided choices.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 5: Retrieve the Calendar URL
          </h3>
          <p>
            Click on the &quot;get calendar URL&quot; button. You&quot;ll see a
            URL displayed on the screen. Copy this URL correctly, ensuring it
            starts with{" "}
            <span className="text-green-500 dark:text-green-400">https://</span>{" "}
            and ends with{" "}
            <span className="text-green-500 dark:text-green-400">
              &preset_time=recentupcoming
            </span>
            .
          </p>
        </li>

        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Step 6: Create Calendify Account
          </h3>
          <p>
            After copying your calendar URL, paste it in the provided input when
            creating calendify account on the signup page.
          </p>
        </li>

        <li>
          <p
            className="
        mb-4 text-sm text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 dark:border-blue-400 p-2 rounded-lg bg-blue-50 dark:bg-blue-900
      "
          >
            If you don&apos;t understand something in this tutorial, please
            contact me via WhatsApp 0715870654
          </p>
        </li>
      </ol>
    </div>
  );
};

export default CalendarInstructions;
