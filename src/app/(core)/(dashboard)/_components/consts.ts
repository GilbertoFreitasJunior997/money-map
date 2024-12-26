import { currencyFormatter } from "@/components/number-input/consts";

export const dashboardChartCurrencyFormatter = (value: unknown) =>
  typeof value === "number" ? currencyFormatter.format(value) : "";
