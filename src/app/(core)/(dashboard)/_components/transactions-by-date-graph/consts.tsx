import { AreaChart, BarChart, LineChart } from "lucide-react";
import { DashboardChartContainerSelectItems } from "../dashboard-chart-container/types";

export const transactionsByDateGraphsOptions = [
  {
    id: 1,
    label: "Area Chart",
    icon: AreaChart,
  },
  {
    id: 2,
    label: "Bar Chart",
    icon: BarChart,
  },
  {
    id: 3,
    label: "Line Chart",
    icon: LineChart,
  },
] as const satisfies DashboardChartContainerSelectItems[];
