"use client";

import { UserType } from "@prisma/client";
import { useSession } from "next-auth/react";
import ButtonUpload from "./button-upload";
import Logo from "./logo";
import UserAvatar from "./user-avatar";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <div className="w-100 flex justify-between items-center mb-4">
      <Logo onlyIcon />

      <div className="flex items-center">
        {session?.user?.type === UserType.ADMIN && (
          <ButtonUpload className="mr-2" />
        )}
        <UserAvatar />
      </div>
    </div>
  );
}
