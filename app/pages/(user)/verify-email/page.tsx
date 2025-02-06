"use client";
import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import { useToast } from "@/app/hooks/use-toast";
import { verifyEmail } from "@/app/lib/api/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function doVerifyEmail() {
      if (token) {
        try {
          setIsLoading(true);
          await verifyEmail(token);
          setIsLoading(false);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error verifying email",
            description: (error as Error).message,
          });
        }
      }
    }

    doVerifyEmail();
  }, [token, toast]);

  if (isLoading) {
    return (
      <div className="mt-4 w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-2xl mt-4 text-center">
        Invalid verification token
      </div>
    );
  }

  function onGoToLoginPageClick() {
    router.push("/pages/login");
  }

  return (
    <div className="w-full">
      <div className="text-2xl mt-4 text-center">
        Account successfully verified!
      </div>
      <Button className="w-full mt-4" onClick={onGoToLoginPageClick}>
        Navigate to Login
      </Button>
    </div>
  );
}
