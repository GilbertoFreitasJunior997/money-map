import { IconProps as RadixIconProps } from "@radix-ui/react-icons/dist/types";
import { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { iconVariants } from "./consts";

export type RadixIcon = ForwardRefExoticComponent<
  RadixIconProps & RefAttributes<SVGSVGElement>
>;

export type IconProps = {
  src: LucideIcon | RadixIcon;
  className?: string;
} & VariantProps<typeof iconVariants>;
