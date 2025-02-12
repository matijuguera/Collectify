"use client";

import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ComboboxOption<T> {
  value: T;
  label: string;
}

interface ComboboxProps<T> {
  options: ComboboxOption<T>[];
  value: T;
  onChange: (value: T | undefined) => void;
  placeholder?: string;
  buttonClassName?: string;
}

export function Combobox<T>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  buttonClassName,
}: ComboboxProps<T>) {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={clsx("w-full justify-between", buttonClassName)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={clsx("p-0")} style={{ width: `${width}px` }}>
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={`${option.value}`}
                  value={`${option.value}`}
                  onSelect={(currentValue: T) => {
                    const selectedValue = currentValue as T;
                    onChange(
                      selectedValue === value ? undefined : selectedValue
                    );
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={clsx(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
