"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaSync } from "react-icons/fa";

type Props = {
  userId?: string;  
};

const RefreshButton = ({ userId }: Props) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if(!isOnline) return toast.error("You are offline. Please check your internet connection and try again.");
    setIsRefreshing(true);
     router.refresh();
    //set is refreshing to false after 1 second
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  //event listener for online and offline
  window.addEventListener("online", () => setIsOnline(true));
  window.addEventListener("offline", () => setIsOnline(false));
  
  
  return (
    <button 
      onClick={handleRefresh}
      className={`border p-2 rounded-full mb-2 mx-1 w-10 h-10 flex items-center justify-center text-center 
                  ${isRefreshing ? 'animate-spin' : ''}`}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <FaSync className={`${isRefreshing ? 'animate-spin' : ''}`} />
    </button>
  );
};

export default RefreshButton;
