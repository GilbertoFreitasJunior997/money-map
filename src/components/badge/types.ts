import { VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { badgeVariants } from "./consts";

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;
