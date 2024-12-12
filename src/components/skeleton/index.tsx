import { cn } from "@/lib/utils";
import { SkeletonProps } from "./types";

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn("animate-pulse rounded-md bg-accent", className)}
    {...props}
  />
);
