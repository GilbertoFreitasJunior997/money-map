import * as LabelPrimitive from "@radix-ui/react-label";
import { ComponentPropsWithoutRef, ElementRef } from "react";

export type FormLabelProps = ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
>;
export type FormLabelRef = ElementRef<typeof LabelPrimitive.Root>;
