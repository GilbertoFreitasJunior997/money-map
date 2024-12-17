"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Label } from "../label";
import { CheckboxProps, CheckboxRef } from "./types";

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ className, label, id, name, ...props }, ref) => (
    <div className="flex items-center gap-1">
      <CheckboxPrimitive.Root
        id={id}
        name={name}
        ref={ref}
        className={cn(
          "peer shrink-0 rounded-sm border border-border size-5",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex size-full items-center justify-center text-current",
          )}
        >
          <CheckIcon className="size-5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <Label
        className="cursor-pointer peer"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
