"use client";

import { appConfig } from "@/app-config";
import { LogoProps } from "./types";

export const Logo = ({ onClick }: LogoProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
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
