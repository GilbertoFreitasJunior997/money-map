"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";
import { forwardRef, useContext } from "react";
import {
  InputOtpGroupProps,
  InputOtpGroupRef,
  InputOtpRootProps,
  InputOtpRootRef,
  InputOtpSeparatorProps,
  InputOtpSeparatorRef,
  InputOtpSlotProps,
  InputOtpSlotRef,
} from "./types";

const Root = forwardRef<InputOtpRootRef, InputOtpRootProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
Root.displayName = "InputOTPRoot";

const Group = forwardRef<InputOtpGroupRef, InputOtpGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  ),
);
Group.displayName = "InputOTPGroup";

const Slot = forwardRef<InputOtpSlotRef, InputOtpSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex size-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "z-10 ring-1 ring-ring",
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  },
);
Slot.displayName = "InputOTPSlot";

const Separator = forwardRef<InputOtpSeparatorRef, InputOtpSeparatorProps>(
  ({ ...props }, ref) => (
    <hr
      className="w-2"
      ref={ref}
      {...props}
    />
  ),
);
Separator.displayName = "InputOTPSeparator";

export const InputOtp = { Root, Group, Slot, Separator };
