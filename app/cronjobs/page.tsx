import prisma from "@/libs/prisma";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const usersWithoutCronjob = await prisma.user.findMany({
    where: {
      cronjobId: null,
    },
  });

  console.log(usersWithoutCronjob);

  return (
    <div>
      <h1>Users without cronjob {usersWithoutCronjob.length}</h1>
      <ul>
        {usersWithoutCronjob.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>

      <button>Create cronjob for all users without cronjob</button>
    </div>
  );
};

export default page;
