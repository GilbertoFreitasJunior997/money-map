import { Root } from "@radix-ui/react-checkbox";
import { ComponentPropsWithoutRef, ElementRef } from "react";

export type CheckboxProps = ComponentPropsWithoutRef<typeof Root> & {
  label?: string;
};
export type CheckboxRef = ElementRef<typeof Root>;
