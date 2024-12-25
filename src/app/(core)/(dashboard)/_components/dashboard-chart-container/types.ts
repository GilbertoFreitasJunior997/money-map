import { IconProps } from "@/components/icon/types";
import { SelectBaseItem } from "@/components/select-input/types";
import { SetState } from "@/lib/types";
import { ReactNode } from "react";

export type DashboardChartContainerSelectItems = SelectBaseItem & {
  icon: IconProps["src"];
};

export type DashboardChartContainerProps<
  TSelectItem extends DashboardChartContainerSelectItems,
> = {
  title: string;
  items: TSelectItem[];
  selectedGraph: TSelectItem;
  setSelectedGraph: SetState<TSelectItem>;
  children: ReactNode;
};
