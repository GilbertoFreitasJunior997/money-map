import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover } from "../popover";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Icon } from "../icon";
import { FormInputBase } from "../form/components/form-input-base";
import { fixedForwardRef } from "@/lib/react";
import { FieldValues } from "react-hook-form";
import { ForwardedRef } from "react";
import { DateRangeInputProps, DateRangeInputRef } from "./types";
import { DateRange } from "react-day-picker";

const DateRangeInputBase = <TForm extends FieldValues>(
  {
    value: baseValue,
    label,
    name,
    form,
    description,
    isSkeleton,
    className,
    onChange,
    ...props
  }: DateRangeInputProps<TForm>,
  ref: ForwardedRef<DateRangeInputRef>,
) => (
  <FormInputBase
    name={name}
    form={form}
    description={description}
    label={label}
    isSkeleton={isSkeleton}
  >
    {({ field }) => {
      const value = form ? field?.value : baseValue;

      const handleChange = (value?: DateRange) => {
        if (value) {
          onChange?.(value);
        }
        field?.onChange(value);
      };

      const Comp = (
        <div
          className={cn("grid gap-2", className)}
          ref={ref}
          {...props}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "text-center font-normal space-x-2 w-[300px]",
                  !value && "text-muted-foreground",
                )}
              >
                <Icon src={CalendarIcon} />
                {value?.from ? (
                  value.to ? (
                    <p>
                      {format(value.from, "LLL dd, y")} -{" "}
                      {format(value.to, "LLL dd, y")}
                    </p>
                  ) : (
                    format(value.from, "LLL dd, y")
                  )
                ) : (
                  <p>Pick a date</p>
                )}
              </Button>
            </Popover.Trigger>
            <Popover.Content
              className="w-auto p-0"
              align="start"
              sideOffset={8}
            >
              <Calendar
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={handleChange}
                numberOfMonths={2}
              />
            </Popover.Content>
          </Popover.Root>
        </div>
      );
      return Comp;
    }}
  </FormInputBase>
);

export const DateRangeInput = fixedForwardRef(DateRangeInputBase);
