"use client";

import { useMemo } from "react";
import "./BorderGlow.css";

export default function BorderGlow({
  children,
  glowColor = "20 70 60",
  backgroundColor = "#0f0f0f",
  borderRadius = 16,
  glowRadius = 32,
  glowIntensity = 1.2,
  colors = ["#e8651a", "#5a2a0a", "#f0ede6"],
  animated = true,
  style = {},
  className = "",
}) {
  const cssVars = useMemo(
    () => ({
      "--glow-colors": colors.join(", "),
      "--glow-radius": `${glowRadius}px`,
      "--glow-intensity": glowIntensity,
      "--bg-color": backgroundColor,
      "--border-radius": `${borderRadius}px`,
    }),
    [backgroundColor, borderRadius, colors, glowIntensity, glowRadius]
  );

  return (
    <div
      className={`border-glow-shell ${animated ? "is-animated" : ""} ${className}`.trim()}
      style={{ ...cssVars, ...style, borderRadius }}
    >
      <div className="border-glow-inner" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}
