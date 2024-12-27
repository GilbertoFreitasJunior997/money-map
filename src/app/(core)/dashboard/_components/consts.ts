import { currencyFormatter } from "@/components/number-input/consts";
import { DateRange } from "react-day-picker";

export const dashboardChartCurrencyFormatter = (value: unknown) =>
  typeof value === "number" ? currencyFormatter.format(value) : "";

export const getDefaultDateRangeFilter = (): DateRange => {
  const from = new Date(new Date().setMonth(new Date().getMonth() - 1));
  const to = new Date();
  to.setHours(23, 59, 59, 999);

  return {
    from,
    to,
  };
};
