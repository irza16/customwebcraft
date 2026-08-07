"use client";

import { useEffect, useMemo, useRef } from "react";
import "./ElectricBorder.css";

export default function ElectricBorder({
  children,
  color = "#e8651a",
  speed = 1,
  chaos = 0.5,
  borderRadius = 12,
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const animate = () => {
      frame += speed * 0.01;
      const glow = 0.5 + 0.5 * Math.sin(frame * 2.1);
      element.style.boxShadow = `0 0 0 1px ${color}22, 0 0 ${18 + glow * 10}px ${color}33`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [color, speed]);

  const mergedStyle = useMemo(() => ({
    ...style,
    borderRadius,
  }), [borderRadius, style]);

  return (
    <div ref={ref} className="electric-border-shell" style={mergedStyle}>
      {children}
    </div>
  );
}
