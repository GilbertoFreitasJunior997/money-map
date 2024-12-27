"use client";

import { appConfig } from "@/app-config";
import { LogoProps } from "./types";

export const Logo = ({ onClick }: LogoProps) => {
  return (
    <div className="flex items-center gap-2 w-full text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
      <button
        type="button"
        onClick={onClick}
        className="z-10"
      >
        {appConfig.logo}
      </button>

      {appConfig.appName}
    </div>
  );
};
