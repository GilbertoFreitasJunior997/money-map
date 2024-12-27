import { BarChart, Target } from "lucide-react";
import { DashboardChartContainerSelectItems } from "../dashboard-chart-container/types";

export const spendingByCategoryGraphsOptions = [
  {
    id: 1,
    label: "Bar Chart",
    icon: BarChart,
  },
  {
    id: 2,
    label: "Radial Chart",
    icon: Target,
  },
] as const satisfies DashboardChartContainerSelectItems[];
