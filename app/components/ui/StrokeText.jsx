"use client";

import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import "./StrokeText.css";

const defaultEase = "power3.out";

function splitTextIntoChars(text) {
  return text.split("").map((char, index) => ({ char, index }));
}

export default function StrokeText({
  text = "",
  fontSize = 120,
  fontWeight = 700,
  strokeColor = "#ffffff",
  fillColor = "#000000",
  strokeWidth = 1,
  drawDuration = 1.2,
  fillDelay = 0.2,
  stagger = 0.02,
  ease = defaultEase,
  trigger = "mount",
  fillMode = "wipe",
  className = "",
  style = {},
  ...rest
}) {
  const [ready, setReady] = useState(false);

  const chars = useMemo(() => splitTextIntoChars(text), [text]);

  useEffect(() => {
    if (!trigger || !text) return;

    const timeout = window.setTimeout(() => setReady(true), 50);
    return () => window.clearTimeout(timeout);
  }, [text, trigger]);

  useEffect(() => {
    if (!ready || !text) return;

    const elements = Array.from(document.querySelectorAll(".stroke-text-text"));
    elements.forEach((el, index) => {
      const target = el;
      const delay = index * stagger;
      const duration = drawDuration;
      if (fillMode === "wipe") {
        gsap.fromTo(
          target,
          { strokeDashoffset: 1200, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration,
            delay: delay + fillDelay,
            ease,
            overwrite: true,
          }
        );
      } else {
        gsap.fromTo(
          target,
          { strokeDashoffset: 1200, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration,
            delay,
            ease,
            overwrite: true,
          }
        );
      }
    });
  }, [ready, text, drawDuration, fillDelay, stagger, ease, fillMode]);

  return (
    <div className={`stroke-text-shell ${ready ? "is-ready" : ""} ${className}`.trim()} style={style} {...rest}>
      <svg className="stroke-text-svg" viewBox={`0 0 ${text.length * 120} 220`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={text}>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="stroke-text-text"
          fontSize={fontSize}
          fontWeight={fontWeight}
          stroke={strokeColor}
          fill={fillColor}
          strokeWidth={strokeWidth}
          style={{ opacity: 0 }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
