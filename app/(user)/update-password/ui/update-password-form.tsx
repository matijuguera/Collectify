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
import { useToast } from "@/hooks/use-toast";
import { updatePassword } from "@/lib/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export default function UpdatePasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!token) {
        toast({
          variant: "destructive",
          title: "Invalid token",
          description: "Your are accessing to this page without the url token",
        });
        return;
      }

      await updatePassword(token, values.password, values.confirmPassword);

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });

      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update password error",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your Password"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="w-full"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Repeat your Password"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="w-full"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
}
