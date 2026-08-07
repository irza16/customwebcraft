"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./SpecularButton.css";

/** @typedef {{ children?: React.ReactNode; size?: string; radius?: number; tint?: string; tintOpacity?: number; blur?: number; textColor?: string; lineColor?: string; baseColor?: string; intensity?: number; shineSize?: number; shineFade?: number; thickness?: number; followMouse?: boolean; proximity?: number; autoAnimate?: boolean; onClick?: () => void; className?: string; style?: object }} SpecularButtonProps */

/** @param {SpecularButtonProps} props */
export default function SpecularButton(props) {
  const {
    children,
    size = "md",
    radius = 14,
    tint = "#e8651a",
    tintOpacity = 0.12,
    blur = 0,
    textColor = "#f0ede6",
    lineColor = "#e8651a",
    baseColor = "#5a2a0a",
    intensity = 1,
    shineSize = 12,
    shineFade = 45,
    thickness = 1,
    followMouse = false,
    proximity = 300,
    autoAnimate = false,
    onClick = undefined,
    className = "",
    style = {},
  } = props;
  const [hovered, setHovered] = useState(false);
  const sizeMap = { sm: "h-11 px-4 text-sm", md: "h-12 px-5 text-sm", lg: "h-14 px-6 text-base" };

  const mergedStyle = useMemo(() => ({
    background: `linear-gradient(135deg, ${baseColor} 0%, rgba(255,255,255,0.05) 100%)`,
    color: textColor,
    borderColor: lineColor,
    boxShadow: hovered ? `0 0 0 1px ${lineColor}40, 0 0 30px ${tint}33` : `inset 0 0 0 1px ${lineColor}20`,
    borderRadius: radius,
    ...style,
  }), [baseColor, hovered, lineColor, radius, style, textColor, tint]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`specular-button ${sizeMap[size] || sizeMap.md} ${className}`.trim()}
      style={mergedStyle}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </motion.button>
  );
}
