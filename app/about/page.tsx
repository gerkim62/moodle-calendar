import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About developer.gerison",
  description: `I am a software engineering student at the University of Eastern Africa. I have a passion for web development and enjoy working with React, Next.js, and Tailwind CSS.`,
  keywords:
    "software engineering, web development, React, Next.js, Tailwind CSS",
};

const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 max-w-md w-[90vw] m-4 mx-auto">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="text-lg">
          I am a software engineering student at the University of Eastern
          Africa. I have a passion for web development and enjoy working with
          React, Next.js, and Tailwind CSS.
        </p>
      </div>
    </div>
  );
};

export default About;
