import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ComponentPropsWithoutRef, ElementRef } from "react";

export type AccordionItemProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;
export type AccordionItemRef = ElementRef<typeof AccordionPrimitive.Item>;

export type AccordionTriggerProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;
export type AccordionTriggerRef = ElementRef<typeof AccordionPrimitive.Trigger>;

export type AccordionContentProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;
export type AccordionContentRef = ElementRef<typeof AccordionPrimitive.Content>;
