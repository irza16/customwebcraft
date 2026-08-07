"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionValue } from "framer-motion";

export function BrowserFrame({
  domain,
  imageSrc,
  rotateX,
  rotateY,
  className = "",
}: {
  domain: string;
  imageSrc: string;
  rotateX: MotionValue<number> | number;
  rotateY: MotionValue<number> | number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border border-line bg-bg-secondary shadow-[0_30px_90px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-[#0f1217] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-w-0 flex-1 rounded-full border border-line bg-[#0a0d12] px-3 py-1 text-[11px] text-text-body">
          {domain}
        </div>
      </div>
      <div className="relative h-[430px] overflow-hidden md:h-[520px]">
        <motion.img
          src={imageSrc}
          alt={`${domain} website screenshot`}
          className="block w-full max-w-none"
          animate={reduced ? { y: 0 } : { y: ["0%", "-48%", "0%"] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 26, ease: "linear", repeat: Infinity }
          }
        />
      </div>
    </motion.div>
  );
}