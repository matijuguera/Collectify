import Topbar from "@/components/ui/topbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
}
