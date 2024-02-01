"use client";

import createCronJob from "@/libs/createCronJob";
import React, { useState } from "react";

function UrlForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here, e.g., send the URL to the server
    console.log("Submitted URL:", url);
    console.log(`createCronJob(${url})`);
    const payload = { url, title: "Test cronjob" };
    const res = await createCronJob(payload);
    console.log(res);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2
        className="
            text-3xl font-extrabold text-gray-900
            sm:text-4xl text-center
        "
      >
        Cron Test
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Enter URL:
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UrlForm;
