"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./TextType.css";

export default function TextType({
  texts = ["Text"],
  typingSpeed = 70,
  deletingSpeed = 50,
  loop = true,
  pauseDuration = 2000,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
  style = {},
  cursorClassName = "",
  cursorStyle = {},
}) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  const currentTarget = useMemo(() => texts[textIndex % texts.length] ?? "", [textIndex, texts]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTarget.length) {
          setCurrentText(currentTarget.slice(0, currentText.length + 1));
        } else {
          if (!loop) {
            return;
          }
          setIsDeleting(true);
          setIsBlinking(false);
          window.setTimeout(() => setIsBlinking(true), 180);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? deletingSpeed : currentText === currentTarget ? pauseDuration : typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [currentText, currentTarget, deletingSpeed, isDeleting, loop, pauseDuration, typingSpeed]);

  return (
    <span className={`text-type-shell ${className}`.trim()} style={style}>
      <motion.span className="text-type-text" animate={{ opacity: [1, 1, 1] }}>
        {currentText}
      </motion.span>
      {showCursor ? (
        <motion.span
          className={`text-type-cursor ${cursorClassName}`.trim()}
          style={{ backgroundColor: "currentColor", ...cursorStyle }}
          animate={{ opacity: isBlinking ? [1, 0, 1] : 1 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {cursorCharacter}
        </motion.span>
      ) : null}
    </span>
  );
}
