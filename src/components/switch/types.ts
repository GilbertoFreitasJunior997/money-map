import { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";

import { Root } from "@radix-ui/react-switch";

export type SwitchRef = ElementRef<typeof Root>;
export type SwitchProps = ComponentPropsWithoutRef<typeof Root> & {
  label?: ReactNode;
};
