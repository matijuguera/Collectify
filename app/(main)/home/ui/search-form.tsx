"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  themeName: z.string(),
  setName: z.string(),
  cardIdentifier: z.string(),
});

export default function SearchForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themeName: "",
      setName: "",
      cardIdentifier: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: navigate to search page
    console.log(values);
    toast({
      title: "Search",
      description: "Search submitted",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 mt-6"
      >
        <FormField
          control={form.control}
          name="themeName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  {...field}
                  placeholder="Select Theme"
                  options={[]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="setName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  {...field}
                  placeholder="Select Set"
                  options={[]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="setName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  {...field}
                  placeholder="Search Card"
                  options={[]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Search
        </Button>
      </form>
    </Form>
  );
}
