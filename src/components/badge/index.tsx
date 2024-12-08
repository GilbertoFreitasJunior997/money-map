import { cn } from "@/lib/utils";
import { BadgeProps } from "./types";
import { badgeVariants } from "./consts";

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};
