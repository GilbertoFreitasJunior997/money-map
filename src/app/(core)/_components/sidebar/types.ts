import { Route } from "@/lib/types";
import { ReactNode } from "react";

export type SidebarProps = {
  UserNav: ReactNode;
};

export type SidebarItemProps = {
  route: Route;
};
