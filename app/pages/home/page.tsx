"use client";

import { Button } from "@/app/components/ui/button";
import Topbar from "@/app/components/ui/topbar";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Unauthenticated</div>;
  }

  const onSignOut = () => {
    signOut({ callbackUrl: "/pages/login" });
  };

  return (
    <div>
      <Topbar />
      <h1>Welcome, {session?.user?.email}</h1>
      <p>Home</p>
      <Button className="w-full" onClick={onSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
