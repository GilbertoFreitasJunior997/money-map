"use client";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItemProps } from "./types";
import { getIsSidebarItemCurrentPath } from "./utils";

export const SidebarItem = ({ route }: SidebarItemProps) => {
  const { name, path, icon } = route;

  const pathname = usePathname();
  const isSelected = getIsSidebarItemCurrentPath(pathname, path);

  return (
    <Link
      className={cn(
        "h-10 rounded-xl flex items-center transition-colors",
        isSelected ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted",
      )}
      href={path}
      title={name}
    >
      <div className="min-w-10 h-10 grid place-content-center">
        <Icon
          src={icon}
          className="size-4"
        />
      </div>

      <span>{name}</span>
    </Link>
  );
};
