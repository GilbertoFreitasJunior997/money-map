import { Skeleton } from "@/components/skeleton";
import { cn } from "@/lib/utils";
import { SummaryCardProps } from "./types";

export const SummaryCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  isLoading,
}: SummaryCardProps) => {
  const trendColor =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-gray-600 dark:text-gray-400";

  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  const displayValue = value
    ? value < 0
      ? `-$${Math.abs(value).toFixed(2)}`
      : `$${value.toFixed(2)}`
    : "";

  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="size-6 text-primary" />
      </div>
      <div className="text-3xl font-bold mb-2">
        {isLoading ? <Skeleton className="w-24 h-9" /> : displayValue}
      </div>
      {!!trend && (
        <div className={cn("text-sm flex items-center", trendColor)}>
          {isLoading ? (
            <Skeleton className="w-52 h-4" />
          ) : (
            <>
              <span className="mr-1">{trendIcon}</span>
              {trendValue}
            </>
          )}
        </div>
      )}
    </div>
  );
};
