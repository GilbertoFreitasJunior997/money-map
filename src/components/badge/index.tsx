import { cn } from "@/lib/utils";
import { badgeVariants } from "./consts";
import { BadgeProps } from "./types";

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};
