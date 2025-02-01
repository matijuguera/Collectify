"use client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/hooks/use-toast";
import { forgotPassword } from "@/app/lib/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
});

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [wasForgotPasswordSent, setWasForgotPasswordSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onGoBackToLoginClick() {
    router.push("/pages/login");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await forgotPassword(values.email);
      setWasForgotPasswordSent(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error sending email",
        description: (error as Error).message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mt-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your Email"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {wasForgotPasswordSent && (
          <>
            <div className="text-green-300 text-center">
              If the email exists you will receive an email
            </div>
            <Button onClick={onGoBackToLoginClick} className="w-full">
              Go back to Login
            </Button>
          </>
        )}
        {!wasForgotPasswordSent && (
          <Button type="submit" className="w-full">
            Send
          </Button>
        )}
      </form>
    </Form>
  );
}
