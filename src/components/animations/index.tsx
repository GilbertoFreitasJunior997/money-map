"use client";

import { motion } from "framer-motion";
import { AnimationProps, AnimationSlideInProps } from "./types";

export const FadeIn = ({ children }: AnimationProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export const StaggerChildren = ({ children }: AnimationProps) => (
  <motion.div
    variants={{
      show: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
    initial="hidden"
    animate="show"
  >
    {children}
  </motion.div>
);

export const FadeInStaggered = ({ children }: AnimationProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
  >
    {children}
  </motion.div>
);

export const ScaleOnHover = ({ children }: AnimationProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({
  children,
  direction = "left",
}: AnimationSlideInProps) => {
  const variants = {
    hidden: {
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export const Pulse = ({ children }: AnimationProps) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    }}
  >
    {children}
  </motion.div>
);
