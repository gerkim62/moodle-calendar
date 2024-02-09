"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Route {
  href: string;
  label: string;
  hidden?: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  const routes: Route[] = [
    { href: "/", label: "Home" },

    { href: "/dashboard", label: "My Events" },
    { href: "/tutorial", label: "Tutorial", hidden: pathname !== "/signup" },
    // logout link if user is logged in
    // { href: "/signout", label: "Logout", hidden: status !== "authenticated" },
    // login link if user is not logged in
    { href: "/signin", label: "Login", hidden: status == "authenticated" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-sm">
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed z-10 inset-0 overflow-hidden bg-black opacity-10 ${
          isOpen ? "" : "hidden"
        }`}
      ></div>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            height={35}
            className="mt-1"
            src="/calendify-min.png"
            alt="Calendify"
            width={35}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Calendify
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={toggleNavbar}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-5"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "" : "hidden"
          } w-full lg:flex lg:w-auto lg:items-center`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:bg-transparent lg:items-center lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  lg:dark:bg-gray-900 dark:border-gray-700 relative z-50">
            {routes.map((route, index) => (
              <li
                className={`${route?.hidden ? "!hidden" : ""}`}
                onClick={() => setIsOpen(false)}
                key={index}
              >
                <Link
                  href={route.href}
                  className={`block py-2 lg:py-1 px-2 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent ${
                    pathname === route.href
                      ? "bg-blue-200 dark:lg:bg-blue-600 dark:text-black lg:bg-transparent text-blue-700 !dark:text-white my-2"
                      : ""
                  } ${route?.hidden ? "!hidden" : ""}`}
                  aria-current={route.href === pathname ? "page" : undefined}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
