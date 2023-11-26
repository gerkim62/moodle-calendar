import Link from 'next/link';
import React from 'react';

const links = [
  { text: 'About', url: '/about' },
  { text: 'Contact', url: '/contact' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="h/" className="hover:underline">Calendify</Link>. All Rights Reserved.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.url} className={`hover:underline ${index !== links.length - 1 ? 'me-4 md:me-6' : ''}`}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
