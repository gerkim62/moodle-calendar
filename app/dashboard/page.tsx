import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

import LoginAlert from "@/components/LoginAlert";
import Stats from "@/components/Stats";
import authOptions from "../api/auth/[...nextauth]/options";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session || !session.user) {
    redirect("/signin");
  }

  const id = (session.user as any).id;
  const name = (session.user as any).name;
  console.log(id);
  return (
    <div>
      <LoginAlert username={name} />

    </div>
  );
};

export default page;
