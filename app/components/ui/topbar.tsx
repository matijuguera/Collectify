import { UserType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import ButtonUpload from "./button-upload";
import Logo from "./logo";

export default function Topbar() {
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <div className="w-100 flex justify-between items-center mb-4">
      <Logo onlyIcon />

      <div className="flex items-center">
        {session?.user?.type === UserType.ADMIN && (
          <ButtonUpload className="mr-2" />
        )}
        <Avatar>
          <AvatarFallback>
            {session?.user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
