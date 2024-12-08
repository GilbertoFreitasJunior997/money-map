import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    size: {
      default: "w-4 h-4",
      text: "",
      none: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
