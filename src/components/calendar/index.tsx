"use client";

import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "../button/consts";
import { CalendarProps } from "./types";
import { Icon } from "../icon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button";

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn("p-3", className)}
    classNames={{
      months: "flex justify-center",
      month: "space-y-4",
      month_caption: "text-center",
      caption_label: "text-sm font-bold ",
      button_previous: "absolute left-2",
      button_next: "absolute right-2",
      month_grid: "w-full border-collapse space-y-1",
      weekdays: "flex",
      weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
      week: "flex w-full mt-2",
      day_button: cn(
        "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
        props.mode === "range"
          ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
          : "[&:has([aria-selected])]:rounded-md",
      ),
      day: cn(buttonVariants({ variant: "ghost" }), "size-8"),
      range_start: "day-range-start rounded-none rounded-s-md",
      range_middle:
        "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-none",
      range_end: "day-range-end rounded-none rounded-e-md",
      selected:
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      today: "bg-accent text-accent-foreground",
      outside:
        "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
      disabled: "text-muted-foreground opacity-50",
      hidden: "invisible",
      ...classNames,
    }}
    components={{
      NextMonthButton: (props) => (
        <Button
          {...props}
          variant={"outline"}
          size={"icon"}
        >
          <Icon src={ChevronRight} />
        </Button>
      ),
      PreviousMonthButton: (props) => (
        <Button
          {...props}
          variant={"outline"}
          size={"icon"}
        >
          <Icon src={ChevronLeft} />
        </Button>
      ),
    }}
    {...props}
  />
);
Calendar.displayName = "Calendar";
