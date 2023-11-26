"use client";

import { signupFormSubmit } from "@/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

type SignupPageProps = any;

const SignupPage: React.FC<SignupPageProps> = ({
  searchParams,
}: SignupPageProps) => {

  const { data: session, status } = useSession()
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/dashboard");
  }

  const [usernameError, setUsernameError] = React.useState(
    searchParams.usernameError
  );
  const [passwordError, setPasswordError] = React.useState(
    searchParams.passwordError
  );
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(
    searchParams.confirmPasswordError
  );
  const [linkError, setLinkError] = React.useState(searchParams.linkError);

  const formData = {
    username: searchParams.username,
    password: searchParams.password,
    confirmPassword: searchParams.confirmPassword,
    link: searchParams.link,
  };

  console.log(formData.link);

  const [loading, setLoading] = React.useState(false);
  return (
    <form
      onSubmit={(e) => {
        if (
          usernameError ||
          passwordError ||
          confirmPasswordError ||
          linkError
        ) {
          e.preventDefault();
          toast.error("Please fix the errors first!");
          setLoading(false);
        } else setLoading(true);
      }}
      action={signupFormSubmit}
      className="max-w-md w-[90vw] mx-auto"
    >
      <p className="text-sm mt-6 mb-4 text-center">
        How to obtain calendar Link?
        <Link href="/tutorial" className="text-blue-500 hover:underline">
          &nbsp;Click here
        </Link>
      </p>

      {/* Input for Link */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          defaultValue={formData.link}
          onChange={(e) => {
            setLinkError("");

            try {
              const url = new URL(e.target.value);

              const params = new URLSearchParams(url.search);

              const authToken = params.get("authtoken");
              const userId = params.get("userid");

              const domain = url.hostname;

              if (typeof domain !== "string") {
                console.log(domain);
                // throw new Error("You entered an invalid link");
                setLinkError("Invalid link");
              }

              if (!authToken || !userId) {
                // throw new Error("You entered incomplete link");
                setLinkError("Incorrect link");
              }
            } catch (error) {
              setLinkError("Invalid link");
            }

            console.log(linkError);
          }}
          type="url"
          name="calendar-link"
          id="calendar-link"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="calendar-link"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Calendar Link
        </label>
        {linkError && (
          <p className="text-red-500 text-sm mt-2 mb-4">{linkError}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          defaultValue={formData.username}
          onChange={(e) => {
            setUsernameError("");
            if (!e.target.value.match(/^[a-zA-Z0-9_.-]{1,200}$/)) {
              setUsernameError(
                "Only letters, numbers, underscores, periods and hyphens are allowed"
              );
              return;
            }
            if (e.target.value.length < 3) {
              setUsernameError("Should be atleast 3 characters");
              return;
            }

            if (e.target.value.length > 20) {
              setUsernameError("Should be less than 20 characters");
              return;
            }
          }}
          type="text"
          name="username"
          id="username"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
        />
        <label
          htmlFor="username"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Username
        </label>
        {usernameError && (
          <p className="text-red-500 text-xs mt-2 mb-4">{usernameError}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          defaultValue={formData.password}
          onChange={(e) => {
            setPasswordError("");
            if (e.target.value.length < 4) {
              setPasswordError("Too short");
              return;
            }
          }}
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
        {passwordError && (
          <p className="text-red-500 text-sm mt-2 mb-4">{passwordError}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => {
            setConfirmPasswordError("");
            if (
              e.target.value !==
              (document?.getElementById("password") as HTMLInputElement).value
            ) {
              setConfirmPasswordError("Passwords do not match");
              return;
            }
            if (e.target.value.length < 3) {
              setConfirmPasswordError("Too short");
              return;
            }
          }}
          type="password"
          name="confirm-password"
          id="confirm-password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="confirm-password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Password
        </label>
        {confirmPasswordError && (
          <p className="text-red-500 text-sm mt-2 mb-4">
            {confirmPasswordError}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center">
        <button className="w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0 relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <span className="relative flex justify-center items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
              Create Account <FaArrowRight />
            </span>
          )}
        </button>

        <p className="mt-2 sm:mt-0 text-sm">
          Already have an Account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupPage;
