import { ComponentType, ReactNode } from "react";
import { chartThemes } from "./consts";

export type ChartTheme = keyof typeof chartThemes;

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<ChartTheme, string> }
  );
};

export type ChartContextProps = {
  config: ChartConfig;
};
