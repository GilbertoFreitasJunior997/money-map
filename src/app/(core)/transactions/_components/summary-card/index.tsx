import { currencyFormatter } from "@/components/number-input/consts";
import { Skeleton } from "@/components/skeleton";
import { cn, uppercaseFirstLetter } from "@/lib/utils";
import {
  ArrowRightLeft,
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { SummaryCardProps } from "./types";

export const SummaryCard = ({
  type,
  value,
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
  const Icon =
    type === "all"
      ? DollarSignIcon
      : type === "income"
        ? TrendingUpIcon
        : type === "expense"
          ? TrendingDownIcon
          : ArrowRightLeft;

  const title = type === "all" ? "Total Balance" : uppercaseFirstLetter(type);

  const baseValue = type === "expense" ? -value : value;
  const displayValue = currencyFormatter.format(baseValue ?? 0);

  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 border flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="size-6 text-primary" />
      </div>
      <div className="text-3xl font-bold mb-2 overflow-hidden truncate">
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
