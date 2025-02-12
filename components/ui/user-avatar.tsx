import { PopoverContent } from "@radix-ui/react-popover";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { Popover, PopoverTrigger } from "./popover";
import { Label } from "./typography";

export default function UserAvatar() {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarFallback>
            {session?.user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end">
        <div className="border border-solid border-white bg-black rounded-lg p-3">
          <div className="mb-3">
            <Label>{session?.user?.email}</Label>
          </div>
          <Button
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut />
            Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
