"use client";

import { Button } from "@/app/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import SearchForm from "./search-form";

export default function SearchCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-100 mb-4">
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between space-x-4 py-1 px-2 bg-white rounded-lg text-black">
          <h4 className="text-sm font-semibold  ">Search Card</h4>

          <Button variant="outline" className="bg-white" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SearchForm />
      </CollapsibleContent>
    </Collapsible>
  );
}
