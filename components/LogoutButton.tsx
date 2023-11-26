"use client";

import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

const LogoutButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
       await signOut();
        // setLoading(false);
      }}
      className="text-blue-600 hover:underline"
    >
      {loading?"loading...":"Log out"}
    </button>
  );
};

export default LogoutButton;
