"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" },
  },
};

export function SectionReveal({
  children,
  delay = 0,
  id,
  className,
}: {
  children: ReactNode;
  delay?: number;
  id?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      variants={reduced ? undefined : sectionVariants}
      initial={reduced ? { opacity: 1, y: 0 } : "hidden"}
      whileInView={reduced ? { opacity: 1, y: 0 } : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduced ? { duration: 0 } : { delay }}
    >
      {children}
    </motion.section>
  );
}