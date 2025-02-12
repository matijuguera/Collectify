"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters"),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onRegisterNewAccountClick() {
    router.push("/sign-in");
  }

  function onForgotPasswordClick() {
    router.push("/forgot-password");
  }

  const onLoginWithGoogleClick = async () => {
    await signIn("google", {
      callbackUrl: "/home",
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (response?.error) {
        form.setError("email", { message: response.error });
        return;
      }
      router.push("/home");
    } catch (error) {
      form.setError("email", { message: error as string });
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
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your Password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center">
          <Label
            onClick={onForgotPasswordClick}
            htmlFor="forgot-password"
            className="underline cursor-pointer"
          >
            Forgot password?
          </Label>
        </div>

        <Button type="submit" className="w-full py-2">
          Login
        </Button>
        <Button
          variant="outline"
          className="w-full text-primary-500"
          type="button"
          onClick={onLoginWithGoogleClick}
        >
          Login with Google{" "}
          <Image src="/google-icon.png" alt="Google" width={20} height={20} />
        </Button>
        <Button
          type="button"
          className="w-full"
          onClick={onRegisterNewAccountClick}
          variant="secondary"
        >
          Register new account
        </Button>
      </form>
    </Form>
  );
}
