"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./RotatingText.css";

export default function RotatingText({
  texts = ["Text"],
  mainClassName = "",
  style = {},
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
  staggerFrom = "last",
  staggerDuration = 0.03,
  splitLevelClassName = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => window.clearInterval(interval);
  }, [rotationInterval, texts.length]);

  return (
    <span className={`rotating-text-shell ${mainClassName}`.trim()} style={{ ...style }}>
      <span className="rotating-text-words">
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[index]}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            className={`rotating-text-word ${splitLevelClassName}`.trim()}
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
