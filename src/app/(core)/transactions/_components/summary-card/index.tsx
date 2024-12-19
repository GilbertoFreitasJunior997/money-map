import { cn } from "@/lib/utils";
import { SummaryCardProps } from "./types";

export const SummaryCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
}: SummaryCardProps) => {
  const trendColor =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-gray-600 dark:text-gray-400";

  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 dark:shadow-accent">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="size-6 text-primary" />
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className={cn("text-sm flex items-center", trendColor)}>
        <span className="mr-1">{trendIcon}</span>
        {trendValue}
      </p>
    </div>
  );
};
