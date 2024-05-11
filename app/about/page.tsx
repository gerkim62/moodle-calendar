import React from "react";

import { Metadata } from "next";
import Link from "next/link";
import CustomLink from "@/components/CustomLink";

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
        <p className="mb-2">My name is <span className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              developer.gerison
            </span>
          </span></p>
        <p className="text-lg">
          I am a software engineering student at the University of Eastern
          Africa. I have a passion for web development and enjoy working with
          React, Next.js, and Tailwind CSS.
        </p>
        <p className="mt-2">
          If you need a website or web application, you can contact me via the
          details at the contact page. I can make a website for your business or company. I am also available for freelance work.{" "}
          <CustomLink href="/contact">Contact Me</CustomLink>
        </p>
      </div>
    </div>
  );
};

export default About;
