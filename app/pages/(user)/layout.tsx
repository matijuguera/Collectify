"use client";

import Logo from "@/app/components/ui/logo";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const header = getLayoutHeaderByPath(pathname);

  return (
    <div
      id="main-container"
      className="flex flex-col items-center justify-center h-full"
    >
      <Logo />
      {<div className="text-2xl mt-4 text-center">{header}</div>}
      {children}
    </div>
  );
}

function getLayoutHeaderByPath(pathname: string) {
  if (pathname === "/pages/login") {
    return "";
  }

  if (pathname === "/pages/forgot-password") {
    return "Forgot Password";
  }

  if (pathname === "/pages/update-password") {
    return "Update Password";
  }

  if (pathname === "/pages/sign-in") {
    return "Create New User";
  }

  if (pathname === "/pages/verify-email") {
    return "Verify Email";
  }

  return "Missing Header";
}
