import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { Icon } from "@/components/icon";
import { SelectInput } from "@/components/select-input";
import { BarChart2, Loader2Icon } from "lucide-react";
import {
  DashboardChartContainerProps,
  DashboardChartContainerSelectItems,
} from "./types";

export const DashboardChartContainer = <
  TSelectItem extends DashboardChartContainerSelectItems,
>({
  title,
  items,
  selectedGraph,
  setSelectedGraph,
  isLoading,
  transactions,
  children,
}: DashboardChartContainerProps<TSelectItem>) => {
  return (
    <Card.Root className="col-span-1 lg:col-span-2 relative">
      <Card.Header>
        <Card.Title className="flex justify-between items-center">
          <h4 className="w-full">{title}</h4>

          <SelectInput
            name="transactions-per-category-graph-filter"
            items={items}
            value={selectedGraph}
            className="w-[250px]"
            onChange={(value) => setSelectedGraph(value ?? items[0])}
            itemRender={(value) => (
              <div className="flex gap-2 items-center">
                <Icon src={value.icon} />
                <span> {value.label}</span>
              </div>
            )}
          />
        </Card.Title>
      </Card.Header>

      <Card.Content className="min-h-[200px] aspect-video">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : transactions?.length ? (
          <Chart.Container
            config={{}}
            className="min-h-[200px] w-full"
          >
            {children}
          </Chart.Container>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                <BarChart2 />
                <p className="text-center font-semibold">No Data</p>
              </div>

              <p className="text-foreground/60">
                Go ahead and map your transactions
              </p>
            </div>
          </div>
        )}
      </Card.Content>
    </Card.Root>
  );
};
