import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Information",
  description: `Contact Information`,
  keywords: "Contact Information",
};

const Contact = () => {
  return (
    <div className="max-w-md w-[90vw] m-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm1-6a1 1 0 11-2 0 1 1 0 012 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700 dark:text-gray-200">
          Email: gerkim62@gmail.com
        </span>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm1-6a1 1 0 11-2 0 1 1 0 012 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700 dark:text-gray-200">
          Phone: +254715870654
        </span>
      </div>
      <p className="mt-2">
        If you need a website or web application, you can contact me for more
        information. I can make a website for your business or company. I am
        also available for freelance work.{" "}
      </p>
    </div>
  );
};

export default Contact;
