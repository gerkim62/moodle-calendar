"use client"

import React from "react";
import { useFormStatus } from "react-dom";

const Submit = () => {
  const { pending, data, method, action } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

export default Submit;
