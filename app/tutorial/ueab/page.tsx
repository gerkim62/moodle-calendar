import React from 'react';

const CalendarInstructions: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-[90vw] m-4 mx-auto">
      <h2 className="text-xl font-semibold mb-4">How to Get Calendar Link</h2>
      <ol className="list-decimal pl-6">
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">Step 1: Log in to UEAB eLearning</h3>
          <p>
            To begin, access the UEAB eLearning platform by logging in using your credentials.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">Step 2: Access the Calendar Export Link</h3>
          <p>
           After logging in, Click on this <a href="https://ielearning.ueab.ac.ke/calendar/export.php?" className="text-blue-500 dark:text-blue-400" target="_blank" rel="noopener noreferrer">UEAB eLearning Calendar link</a> to proceed to the calendar export page.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">Step 3: Select "All Events"</h3>
          <p>
            Once on the calendar export page, choose the option that says "All Events".
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">Step 4: Choose "Recent and Next 60 Days"</h3>
          <p>
            After selecting "All Events", pick the "Recent and next 60 days" option from the provided choices.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-medium mb-2">Step 5: Retrieve the Calendar URL</h3>
          <p>
            Click on the "get calendar URL" button. You'll see a URL displayed on the screen.
            Copy this URL correctly, ensuring it starts with <span className="text-green-500 dark:text-green-400">https://</span> and ends with <span className="text-green-500 dark:text-green-400">&preset_time=recentupcoming</span>.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default CalendarInstructions;
