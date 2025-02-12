"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function onGoClick() {
    router.push("/login");
  }

  return (
    <div id="main-container" className="h-full flex flex-col overflow-hidden">
      <div
        id="body-container"
        className="flex flex-col items-center justify-center flex-1 animate__animated animate__bounce"
      >
        <Logo />
      </div>
      <div id="footer-container">
        <Button className="w-full" onClick={onGoClick}>
          Go!
        </Button>
      </div>
    </div>
  );
}
