import { ButtonHTMLAttributes } from "react";
import { buttonVariants } from "./consts";
import { VariantProps } from "class-variance-authority";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
export type ButtonRef = HTMLButtonElement;
