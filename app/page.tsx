"use client";

import {
  AnimatePresence,
  MotionValue,
  Variants,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { MouseEvent, ReactNode, useEffect, useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
];

const caseStudies = [
  {
    name: "aesco.pk",
    url: "https://zeen-demo.vercel.app",
    description:
      "Pakistani women's clothing e-commerce build with confident product presentation, local payment flow in the order journey, and a protected admin panel.",
    tags: ["Next.js 14", "Supabase", "Tailwind CSS", "Admin Panel"],
  },
  {
    name: "Brewed.",
    url: "https://cafe-demo-delta.vercel.app",
    description:
      "A coffee shop site shaped around mood and conversion: animated section reveals, menu storytelling, and a clear booking/contact path.",
    tags: ["Next.js 14", "Tailwind CSS", "Framer Motion", "Scroll Reveals"],
  },
];

const processSteps = [
  {
    title: "1. You review a demo",
    text: "I show a focused demo first so you can judge quality before full commitment.",
  },
  {
    title: "2. We scope it together",
    text: "We lock pages, timeline, and features around your exact business goals.",
  },
  {
    title: "3. I build & you review",
    text: "You get milestone reviews so we refine copy, visuals, and flow before launch.",
  },
  {
    title: "4. Launch & handoff",
    text: "I deploy, connect everything properly, and hand over with a clear walkthrough.",
  },
];

const pricingTiers = [
  {
    title: "Website",
    price: "Starting from Rs. 20,000",
    note: "Final quote depends on pages and feature depth.",
  },
  {
    title: "Website + WhatsApp Bot Integration",
    price: "+Rs. 20,000–35,000",
    note: "Best for faster lead response and repeat customer follow-ups.",
    popular: true,
  },
  {
    title: "Domain Setup",
    price: "Rs. 2,000–3,000",
    note: "Domain purchase guidance, setup, and DNS connection.",
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SectionReveal({
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
      viewport={{ once: true, amount: 0.2 }}
      transition={reduced ? { duration: 0 } : { delay }}
    >
      {children}
    </motion.section>
  );
}

function BrowserFrame({
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
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className={`relative overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_90px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-[#171b22] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="min-w-0 flex-1 rounded-full border border-line bg-[#0f1217] px-3 py-1 text-[11px] text-muted">
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

function HeroShowcase() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [5, -5]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [-4, 4]);
  const rotateYBack = useTransform(mouseX, [-0.5, 0.5], [3, -3]);
  const rotateXBack = useTransform(mouseY, [-0.5, 0.5], [-2, 2]);

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

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative w-full"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.28)_0%,rgba(255,107,53,0)_70%)] blur-2xl" />
      <div className="pointer-events-none absolute right-2 top-4 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.2)_0%,rgba(255,107,53,0)_72%)] blur-2xl" />

      <div className="hidden md:block">
        <BrowserFrame
          domain="zeen-demo.vercel.app"
          imageSrc="/aesco-screenshot.jpeg"
          rotateX={reduced ? 0 : rotateXBack}
          rotateY={reduced ? 0 : rotateYBack}
          className="absolute right-10 top-0 z-10 w-[68%] opacity-90"
        />
        <BrowserFrame
          domain="cafe-demo-delta.vercel.app"
          imageSrc="/brewed-screenshot.jpeg"
          rotateX={reduced ? 0 : rotateX}
          rotateY={reduced ? 0 : rotateY}
          className="relative z-20 mt-24 w-[76%]"
        />
      </div>

      <div className="md:hidden">
        <BrowserFrame
          domain="zeen-demo.vercel.app"
          imageSrc="/aesco-screenshot.jpeg"
          rotateX={0}
          rotateY={0}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <main className="bg-sand text-ink">
      <header className="sticky top-0 z-50 border-b border-line/90 bg-sand/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="font-display text-2xl font-semibold tracking-[-0.03em]">
            customwebcraft
          </a>

          <nav className="hidden min-[901px]:flex min-[901px]:items-center min-[901px]:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-[0.02em] text-muted transition-colors hover:text-clay"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="#contact"
              whileHover={reduced ? {} : { y: -2 }}
              className="inline-flex min-h-11 items-center rounded-xl border border-clay bg-clay px-5 text-sm font-medium text-white transition-colors hover:bg-[#ff7f4f]"
            >
              Get a Demo
            </motion.a>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            className="min-[901px]:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-lg text-ink"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="min-[901px]:hidden border-t border-line bg-paper"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            >
              <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 md:px-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="min-h-11 border-b border-line py-3 text-sm font-medium text-muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-clay bg-clay px-5 text-sm font-medium text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a Demo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SectionReveal className="mx-auto w-full max-w-6xl px-5 pb-14 pt-12 md:px-8 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted">
              Karachi-based freelance web developer
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-6xl">
              Websites for cafes, restaurants, and clothing brands that deserve to look as good
              <span className="text-clay"> online </span>
              as they do in person.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted md:text-lg">
              I build high-trust websites for local businesses that want to look established, not generic. Clean code, strong direction, fast delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href="#work"
                whileHover={reduced ? {} : { y: -2 }}
                className="inline-flex min-h-11 items-center rounded-xl border border-clay bg-clay px-6 text-sm font-medium text-white"
              >
                See the Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={reduced ? {} : { y: -2 }}
                className="inline-flex min-h-11 items-center rounded-xl border border-line bg-paper px-6 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
              >
                Get a Free Demo
              </motion.a>
            </div>

            <div className="mt-9 grid gap-4 border-t border-line pt-6 text-sm text-muted sm:grid-cols-3">
              <p>
                <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">2+</span>
                <br />
                live builds
              </p>
              <p>
                <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">100%</span>
                <br />
                built & deployed personally
              </p>
              <p>
                <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">~1 week</span>
                <br />
                typical turnaround
              </p>
            </div>
          </div>

          <HeroShowcase />
        </div>
      </SectionReveal>

      <SectionReveal id="work" delay={0.05} className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Selected <span className="text-clay">Work</span>
          </h2>
          <p className="text-sm text-muted">2 case studies</p>
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={reduced ? undefined : gridVariants}
          initial={reduced ? { opacity: 1 } : "hidden"}
          whileInView={reduced ? { opacity: 1 } : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {caseStudies.map((project) => (
            <motion.article
              key={project.name}
              variants={reduced ? undefined : cardVariants}
              whileHover={reduced ? {} : { y: -6, borderColor: "#ff6b35" }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="group rounded-2xl border border-line bg-paper p-6"
            >
              <h3 className="font-display text-3xl font-semibold tracking-[-0.03em]">
                {project.name}
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-sand px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-ink px-4 text-sm font-medium transition-colors group-hover:border-clay group-hover:text-clay"
              >
                View live demo ↗
              </a>
            </motion.article>
          ))}
        </motion.div>
      </SectionReveal>

      <SectionReveal id="process" delay={0.08} className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-8 border-b border-line pb-4">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Process
          </h2>
        </div>
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          variants={reduced ? undefined : gridVariants}
          initial={reduced ? { opacity: 1 } : "hidden"}
          whileInView={reduced ? { opacity: 1 } : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step) => (
            <motion.article
              key={step.title}
              variants={reduced ? undefined : cardVariants}
              className="rounded-2xl border border-line bg-paper p-5"
            >
              <h3 className="text-base font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">{step.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </SectionReveal>

      <SectionReveal id="pricing" delay={0.1} className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-8 border-b border-line pb-4">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Pricing
          </h2>
        </div>
        <motion.div
          className="grid gap-4 lg:grid-cols-3"
          variants={reduced ? undefined : gridVariants}
          initial={reduced ? { opacity: 1 } : "hidden"}
          whileInView={reduced ? { opacity: 1 } : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {pricingTiers.map((tier) => (
            <motion.article
              key={tier.title}
              variants={reduced ? undefined : cardVariants}
              whileHover={reduced ? {} : { y: -4 }}
              className={`relative rounded-2xl border p-5 ${
                tier.popular ? "border-clay bg-paper" : "border-line bg-paper"
              }`}
            >
              {tier.popular && (
                <span className="absolute right-4 top-4 rounded-full border border-clay bg-clay px-2 py-1 text-xs font-medium uppercase tracking-wider text-white">
                  Popular
                </span>
              )}
              <h3 className="pr-20 text-base font-medium">{tier.title}</h3>
              <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink">
                {tier.price}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted">{tier.note}</p>
            </motion.article>
          ))}
        </motion.div>
      </SectionReveal>

      <SectionReveal id="contact" delay={0.12} className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 md:px-8">
        <div className="rounded-2xl border border-line bg-paper p-6 md:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Want to see what yours could look like?
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted md:text-base">
            Send your business name and niche. I&apos;ll send a custom direction that fits your market and audience.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <motion.a
              href="https://instagram.com/customwebcraft"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? {} : { y: -2 }}
              className="inline-flex min-h-11 items-center rounded-xl border border-clay bg-clay px-5 text-sm font-medium text-white"
            >
              DM on Instagram
            </motion.a>
            <motion.a
              href="mailto:thecreative956@gmail.com"
              whileHover={reduced ? {} : { y: -2 }}
              className="inline-flex min-h-11 items-center rounded-xl border border-line bg-sand px-5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              Email: thecreative956@gmail.com
            </motion.a>
          </div>
        </div>
      </SectionReveal>

      <footer className="border-t border-line py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-xs font-light text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} customwebcraft</p>
          <p>Freelance web development for Karachi brands.</p>
        </div>
      </footer>
    </main>
  );
}
