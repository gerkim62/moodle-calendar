import Image from "next/image";
import ical from "ical";

// export default async function Home() {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   const url =
//     "https://ielearning.ueab.ac.ke/calendar/export_execute.php?userid=10131&authtoken=167e3931aaedc0dffbcde1941b7a4224d93b1025&preset_what=all&preset_time=recentupcoming";



// for (let k in calendar) {
//   if (calendar.hasOwnProperty(k)) {
//       var ev = calendar[k];
//       if (calendar[k].type == 'VEVENT') {
//           console.log(`${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}`);

//       }
//   }
// }
//   // console.log(calendar);
//   return <main>{JSON.stringify(calendar)}</main>;
// }

import React from "react";
import { calendarLinkSubmit } from "@/actions";
import Submit from "@/components/Submit";

const Homepage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto p-6 md:bg-white rounded-lg text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          Welcome to eLearning Calendar Viewer
        </h1>
        <p className="text-gray-600 mb-6">
          This utility app will scan your eLearning platform and find all
          upcoming events such as quizzes, assignments, discussions, and more.
        </p>
        <form action={calendarLinkSubmit} className="max-w-sm mx-auto">
          <div className="mb-6 flex">
            <input
              type="url"
              required
              name="link"
              placeholder="Paste eLearning calendar link here..."
              className="border border-gray-300 rounded-l px-4 py-2 w-full"
            />
           <Submit  />
          </div>
        </form>
        <div className="space-y-4">
          <a
            href="/get-calendar-link-guide"
            className="text-gray-500 hover:text-gray-600 font-semibold block mt-4"
          >
            How to Get the Calendar Link
          </a>
         

          {/* Add more links here */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
