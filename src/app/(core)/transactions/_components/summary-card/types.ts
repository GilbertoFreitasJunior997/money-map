import { IconProps } from "@/components/icon/types";

export type SummaryCardProps = {
  title: string;
  value: string;
  icon: IconProps["src"];
  trend: "up" | "down" | "neutral";
  trendValue: string;
};
