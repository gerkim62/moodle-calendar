"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(status);

//   if (status !== "authenticated") {
//     router.replace("/login");
//   }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function changePasswordFormSubmit() {
    setLoading(true);
    try {
      // Include logic for changing password

      // Example:
      // const result = await changePasswordFunction(oldPassword, newPassword, confirmNewPassword);

      // Handle the result as needed

      // if (!result) {
      //   toast.error("Something went wrong!");
      //   setLoading(false);
      //   return;
      // }

      // if (result.error) {
      //   setError(result.error);
      //   setLoading(false);
      //   return;
      // }

      // Successful password change, you may want to redirect to a profile page or handle it accordingly.

      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        changePasswordFormSubmit();
      }}
      className="max-w-md w-[90vw] mx-auto"
    >
      <p>
        <span className="text-2xl font-extrabold dark:text-white">
          Change Your Password for{" "}
          <span className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Calendify
            </span>
          </span>
        </span>
      </p>

      {/* Instructions */}
      <p className="mt-2 ">
        <span className="font-extrabold dark:text-white">
          <span className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Enter your old password and create a new password.
            </span>
          </span>
        </span>
      </p>

      {/* Input for Old Password */}
      <div className="relative z-0 w-full mb-5 group mt-6">
        <input
          onChange={(e) => {
            setError("");
            setOldPassword(e.target.value);
          }}
          type="password"
          name="old-password"
          id="old-password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="old-password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Old Password
        </label>
      </div>

      {/* New Password */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => {
            setError("");
            setNewPassword(e.target.value);
          }}
          type="password"
          name="new-password"
          id="new-password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="new-password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          New Password
        </label>
      </div>

      {/* Confirm New Password */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => {
            setError("");
            setConfirmNewPassword(e.target.value);
          }}
          type="password"
          name="confirm-new-password"
          id="confirm-new-password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="confirm-new-password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm New Password
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:justify-between items-center">
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto mt-2 sm:mt-0 mb-2 sm:mb-0 relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative flex justify-center items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
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
              <>
                Change Password <FaArrowRight />
              </>
            )}
          </span>
        </button>

        {/* Logout Link */}
      
      </div>
    </form>
  );
};

export default ChangePasswordPage;
