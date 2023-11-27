"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = async () => {
    // You can include your logout logic here
    // For example, using next-auth's signOut function
    await signOut();

    // Display a success message
    toast.success("Logged out successfully");

    // Redirect to the home page or any other desired page
    router.push("/");
  };

  return (
    <div className="max-w-md w-[90vw] mx-auto">
      <p className="text-2xl font-extrabold dark:text-white">
        Logout 
      </p>

      <p className="mt-4">
        Are you sure you want to logout, {session?.user?.name || "user"}?
      </p>

      <div className="flex mt-4">
        <button
          onClick={() => setConfirmLogout(true)}
          className="px-4 py-2 mr-2 text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-md"
        >
          Logout
        </button>
        <button
          onClick={() => router.push("/dashboard")} // You can change the redirect path
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
        >
          Cancel
        </button>
      </div>

      {confirmLogout && (
        <div className="mt-4">
          <p className="text-red-500">Are you sure you want to logout?</p>
          <div className="flex mt-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 mr-2 text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-md"
            >
              Confirm Logout
            </button>
            <button
              onClick={() => setConfirmLogout(false)}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutPage;
