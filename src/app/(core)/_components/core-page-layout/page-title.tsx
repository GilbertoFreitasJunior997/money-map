"use client";

import { appConfig } from "@/app-config";
import { uppercaseFirstLetter } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { getIsSidebarItemCurrentPath } from "../sidebar/utils";

export const PageTitle = () => {
  const pathname = usePathname();
  const currentRoute = appConfig.routes.find((route) =>
    getIsSidebarItemCurrentPath(pathname, route.path),
  );

  if (!currentRoute) {
    return null;
  }

  return (
    <h1 className="font-semibold text-xl pt-4 pb-[10px]">
      {uppercaseFirstLetter(currentRoute.name)}
    </h1>
  );
};
