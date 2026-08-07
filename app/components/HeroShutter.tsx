"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const headlineLines = ["KARACHI BUSINESS", "LOOK PROFESSIONAL", "BOOK MORE CLIENTS"];

export function HeroShutter() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mm = window.matchMedia("(max-width: 767px), (pointer: coarse)");
      setIsMobile(mm.matches);
      const update = () => setIsMobile(mm.matches);
      if (mm.addEventListener) {
        mm.addEventListener("change", update);
        return () => mm.removeEventListener("change", update);
      }
      mm.addListener(update);
      return () => mm.removeListener(update);
    }
  }, []);

  const shutterDuration = reduced ? 0 : isMobile ? 0.45 : 0.62;
  const staggerDelay = reduced ? 0 : 0.1;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-line bg-[radial-gradient(circle_at_top_left,rgba(201,151,46,0.14),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent)] p-6 sm:p-8 lg:p-10">
      <motion.div className="pointer-events-none absolute inset-0 z-30 bg-accent-gold" initial={reduced ? { height: 0 } : { height: "100%" }} animate={{ height: 0 }} transition={{ duration: shutterDuration, ease: [0.55, 0.055, 0.675, 0.19] }} style={{ overflow: "hidden" }} />

      <div className="relative z-10">
        <motion.p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-text-body sm:text-xs" initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: shutterDuration + staggerDelay * 0, ease: "easeOut" }}>
          Karachi-based freelance web developer
        </motion.p>

        <motion.div className="mt-5 max-w-[90vw] overflow-hidden" initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: shutterDuration + staggerDelay * 1, ease: "easeOut" }}>
          <div className="flex flex-wrap gap-2">
            {headlineLines.map((line) => (
              <span key={line} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium uppercase tracking-[0.2em] text-text-body sm:text-[0.95rem]">
                {line}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-5 flex flex-col gap-1 sm:gap-2" initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: shutterDuration + staggerDelay * 2, ease: "easeOut" }}>
          <h1 className="max-w-full break-words font-display text-[clamp(3rem,13vw,5.6rem)] font-semibold uppercase leading-[0.86] tracking-[-0.08em] text-text-heading sm:text-[clamp(3.2rem,8vw,6rem)]" style={{ WebkitTextStroke: "1px rgba(247,241,232,0.95)" }}>
            customwebcraft
          </h1>
        </motion.div>

        <motion.p className="mt-6 max-w-2xl text-base leading-relaxed text-text-body sm:text-lg" initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}>
          I build custom websites for local businesses in Karachi — currently taking on new projects, with a 1-week turnaround.
        </motion.p>

        <motion.p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body sm:text-lg" initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}>
          I make sites for cafes, restaurants, clothing brands, and service businesses that deserve to feel polished, memorable, and easy to trust.
        </motion.p>

        <motion.div className="mt-8" initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.6, ease: "easeOut" }}>
          <motion.a href="#contact" whileHover={reduced ? {} : { y: -2 }} whileTap={reduced ? {} : { scale: 0.98 }} className="inline-flex min-h-12 items-center rounded-full border border-accent-gold bg-accent-gold px-5 text-sm font-medium text-bg-primary transition-colors hover:bg-[color:rgba(201,151,46,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary">
            Book a Free Demo
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
