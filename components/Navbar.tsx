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

  const {data:session, status} = useSession();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const routes: Route[] = [
    { href: "/", label: "Home" },
    
    { href: "/dashboard", label: "My Events" },
    { href: "/tutorial", label: "Tutorial" },
    // logout link if user is logged in
    { href: "/signout", label: "Logout", hidden: status == "unauthenticated" },
    // login link if user is not logged in
    { href: "/signin", label: "Login", hidden: status == "authenticated" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  const pathname = usePathname();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-sm">
     <div onClick={()=>setIsOpen(false)} className={`md:hidden border absolute z-10 w-full h-full top-0 left-0 bg-black opacity-10 ${isOpen ? '' : 'hidden'}`}></div>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image height={35} className="mt-1"  src="/calendify-min.png" alt="Calendify" width={35} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Calendify
          </span>
        </Link>
        <div>
          <ThemeToggle />
          <button
            onClick={toggleNavbar}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-5"
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
          className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 relative z-50">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  href={route.href}
                  className={`block py-1 md:py-1 px-2  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    pathname === route.href
                      ? "bg-blue-200 dark:bg-blue-600 text-blue-700 dark:text-white px-4 py-3"
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
