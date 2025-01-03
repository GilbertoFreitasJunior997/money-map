"use client";

import { appConfig } from "@/app-config";
import { motion } from "framer-motion";
import { LogoProps } from "./types";

export const Logo = ({ onClick }: LogoProps) => {
  return (
    <motion.div
      className="flex items-center gap-2 w-full text-xl font-bold text-primary"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="z-10"
      >
        {appConfig.logo}
      </button>

      {appConfig.appName}
    </motion.div>
  );
};
