import { Root } from "@radix-ui/react-label";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef } from "react";
import { labelVariants } from "./consts";

export type LabelRef = ElementRef<typeof Root>;

export type LabelProps = ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof labelVariants>;
