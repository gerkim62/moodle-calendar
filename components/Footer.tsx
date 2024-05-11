import Link from "next/link";
import React from "react";
import CustomLink from "./CustomLink";

const links = [
  { text: "About", url: "/about" },
  { text: "Contact", url: "/contact" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <CustomLink href="/" className="hover:underline">
            Calendify
          </CustomLink>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {links.map((link, index) => (
            <li key={index}>
              <CustomLink
                href={link.url}
                className={`hover:underline ${
                  index !== links.length - 1 ? "me-4 md:me-6" : ""
                }`}
              >
                {link.text}
              </CustomLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
