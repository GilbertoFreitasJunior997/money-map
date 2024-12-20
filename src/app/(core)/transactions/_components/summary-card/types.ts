import { IconProps } from "@/components/icon/types";

export type SummaryCardProps = {
  title: string;
  value: number;
  icon: IconProps["src"];
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  isLoading: boolean;
};
