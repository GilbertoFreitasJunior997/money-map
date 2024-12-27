import { BarChart, ChartPie, Target } from "lucide-react";
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
  {
    id: 3,
    label: "Pie Chart",
    icon: ChartPie,
  },
] as const satisfies DashboardChartContainerSelectItems[];
