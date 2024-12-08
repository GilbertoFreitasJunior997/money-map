"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  AccordionContentProps,
  AccordionContentRef,
  AccordionItemProps,
  AccordionItemRef,
  AccordionTriggerProps,
  AccordionTriggerRef,
} from "./types";
import { forwardRef } from "react";

const Root = AccordionPrimitive.Root;

const Item = forwardRef<AccordionItemRef, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  ),
);
Item.displayName = "AccordionItem";

const Trigger = forwardRef<AccordionTriggerRef, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-2 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
Trigger.displayName = AccordionPrimitive.Trigger.displayName;

const Content = forwardRef<AccordionContentRef, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-3", className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
);
Content.displayName = AccordionPrimitive.Content.displayName;

export const Accordion = {
  Root,
  Item,
  Trigger,
  Content,
};
