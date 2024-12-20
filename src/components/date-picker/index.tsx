"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Popover } from "@/components/popover";
import { DatePickerProps } from "./types";

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[--radix-popover-trigger-width] p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          autoFocus
        />
      </Popover.Content>
    </Popover.Root>
  );
};
