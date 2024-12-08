"use client";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { LabelProps, LabelRef } from "./types";
import { labelVariants } from "./consts";

export const Label = forwardRef<LabelRef, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;
