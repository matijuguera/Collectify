import { Suspense } from "react";
import UpdatePasswordForm from "./ui/update-password-form";

export default function Page() {
  return (
    <Suspense>
      <UpdatePasswordForm />
    </Suspense>
  );
}
