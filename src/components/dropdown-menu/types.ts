import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";

export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};
export type DropdownMenuSubTriggerRef = ElementRef<
  typeof DropdownMenuPrimitive.SubTrigger
>;

export type DropdownMenuSubContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;
export type DropdownMenuSubContentRef = ElementRef<
  typeof DropdownMenuPrimitive.SubContent
>;

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;
export type DropdownMenuContentRef = ElementRef<
  typeof DropdownMenuPrimitive.Content
>;

export type DropdownMenuItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean;
};
export type DropdownMenuItemRef = ElementRef<typeof DropdownMenuPrimitive.Item>;

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;
export type DropdownMenuCheckboxItemRef = ElementRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;
export type DropdownMenuRadioItemRef = ElementRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean;
};
export type DropdownMenuLabelRef = ElementRef<
  typeof DropdownMenuPrimitive.Label
>;

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;
export type DropdownMenuSeparatorRef = ElementRef<
  typeof DropdownMenuPrimitive.Separator
>;

export type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;
