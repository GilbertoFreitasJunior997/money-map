import * as SelectPrimitive from "@radix-ui/react-select";
import { ComponentPropsWithoutRef, ElementRef } from "react";

export type SelectTriggerProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
>;
export type SelectTriggerRef = ElementRef<typeof SelectPrimitive.Trigger>;

export type SelectScrollUpButtonProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
>;
export type SelectScrollUpButtonRef = ElementRef<
  typeof SelectPrimitive.ScrollUpButton
>;

export type SelectScrollDownButtonProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollDownButton
>;
export type SelectScrollDownButtonRef = ElementRef<
  typeof SelectPrimitive.ScrollDownButton
>;

export type SelectContentProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>;
export type SelectContentRef = ElementRef<typeof SelectPrimitive.Content>;

export type SelectLabelProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Label
>;
export type SelectLabelRef = ElementRef<typeof SelectPrimitive.Label>;

export type SelectItemProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;
export type SelectItemRef = ElementRef<typeof SelectPrimitive.Item>;

export type SelectSeparatorProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Separator
>;
export type SelectSeparatorRef = ElementRef<typeof SelectPrimitive.Separator>;
