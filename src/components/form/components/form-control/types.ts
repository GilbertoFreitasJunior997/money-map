import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ElementRef } from "react";

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot>;
export type FormControlRef = ElementRef<typeof Slot>;
