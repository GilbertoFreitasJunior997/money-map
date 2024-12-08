import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const uppercaseFirstLetter = (str: string) =>
  `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;

export const noop = () => {};
