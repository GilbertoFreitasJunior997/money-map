import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { Icon } from "@/components/icon";
import { SelectInput } from "@/components/select-input";
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
  children,
}: DashboardChartContainerProps<TSelectItem>) => {
  return (
    <Card.Root className="col-span-1 lg:col-span-2">
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

      <Card.Content className="min-h-[200px]">
        <Chart.Container
          config={{}}
          className="min-h-[200px] w-full"
        >
          {children}
        </Chart.Container>
      </Card.Content>
    </Card.Root>
  );
};
