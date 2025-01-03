import { PropsWithChildren } from "react";

export type AnimationProps = PropsWithChildren;

export type AnimationSlideInProps = AnimationProps & {
  direction?: "left" | "right" | "up" | "down";
};
