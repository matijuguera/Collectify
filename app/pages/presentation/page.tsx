import { Button } from "@/app/components/ui/button";
import Logo from "@/app/components/ui/logo";
import React from "react";

export default function page() {
  return (
    <div id="main-container" className="h-full flex flex-col overflow-hidden">
      <div
        id="body-container"
        className="flex flex-col items-center justify-center flex-1 animate__animated animate__bounce"
      >
        <Logo />
      </div>
      <div id="footer-container">
        <Button className="w-full">Go!</Button>
      </div>
    </div>
  );
}
