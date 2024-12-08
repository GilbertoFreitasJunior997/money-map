import { cn } from "@/lib/utils";
import { IconProps } from "./types";
import { iconVariants } from "./consts";

export const Icon = ({ src: Comp, size, className }: IconProps) => (
  <Comp
    className={cn(iconVariants({ size }), className)}
    size={size === "text" ? "1em" : undefined}
  />
);
