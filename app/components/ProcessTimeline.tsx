"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";

const processDays = [
  { day: "Day 1", label: "Discovery call", description: "I gather references, understand your business, and figure out what you want your site to feel like." },
  { day: "Day 2", label: "Direction & scope", description: "I lock the pages, features, and design direction so the build is clear from the start." },
  { day: "Day 3-4", label: "Build", description: "I build the full site — structure, visuals, content, and everything needed to launch well." },
  { day: "Day 5", label: "Review", description: "You see a live demo, and we refine the copy, visuals, and flow together." },
  { day: "Day 6", label: "Revisions", description: "I apply your feedback and polish the details until the site feels right." },
  { day: "Day 7", label: "Launch", description: "Domain and hosting are connected, the site goes live, and I hand everything off clearly." },
];

const gridVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function ProcessTimeline() {
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" variants={reduced ? undefined : gridVariants} initial={reduced ? { opacity: 1 } : "hidden"} whileInView={reduced ? { opacity: 1 } : "visible"} viewport={{ once: true, amount: 0.2 }}>
        {processDays.map((step, index) => (
          <motion.article key={step.day} variants={reduced ? undefined : cardVariants} className="relative rounded-[1.4rem] border border-line bg-bg-secondary p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gold font-display text-sm font-semibold text-bg-primary">
              {index + 1}
            </div>
            <div className="mt-5">
              <p className="font-display text-lg font-semibold text-accent-gold">{step.day}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-text-heading">{step.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">{step.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
