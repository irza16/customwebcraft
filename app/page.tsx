"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionReveal } from "./components/SectionReveal";
import StaggeredMenu from "./components/ui/StaggeredMenu";
import Stepper from "./components/ui/Stepper";
import dynamic from 'next/dynamic';
import BlurText from "./components/ui/BlurText";

type Project = {
  name: string;
  url: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  label: string;
};

const projects: Project[] = [
  {
    name: "Velvo Living",
    url: "https://velvoliving.co.uk",
    description:
      "A UK furniture and mattress e-commerce store with 195+ products, size and firmness variations, PayPal checkout, and SEO built in from day one.",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    label: "Live client · UK",
  },
  {
    name: "imcan.pk",
    url: "https://www.imcan.pk",
    // TODO: replace with the client's business, goal, and a measurable result
    description:
      "A custom Next.js build for a Pakistani business, designed to load fast, rank well, and turn visitors into enquiries.",
    tags: ["Next.js", "Tailwind CSS"],
    label: "Live client · Pakistan",
  },
  {
    name: "aesco.pk",
    url: "https://zeen-demo.vercel.app",
    description:
      "A polished, conversion-first site for a local brand with storytelling-led sections and a clear path to inquiry.",
    tags: ["Next.js", "Tailwind CSS"],
    imageSrc: "/aesco-screenshot.jpeg",
    label: "Concept",
  },
  {
    name: "Brewed.",
    url: "https://cafe-demo-delta.vercel.app",
    description:
      "A warm, premium hospitality experience with atmosphere-first visuals and a frictionless contact funnel.",
    tags: ["Next.js", "Framer Motion"],
    imageSrc: "/brewed-screenshot.jpeg",
    label: "Concept",
  },
];

const processSteps = [
  {
    day: "Day 1 — Discovery",
    description:
      "I learn about your business, gather references, and understand what you want your site to feel like.",
  },
  {
    day: "Day 2 — Direction & Scope",
    description:
      "I lock the pages, features, and design direction. No surprises after this.",
  },
  {
    day: "Day 3–4 — Build",
    description:
      "Full site built — structure, design, content integration, mobile responsiveness.",
  },
  {
    day: "Day 5 — Live Demo",
    description:
      "You see a working demo. We review copy, visuals, and flow together.",
  },
  {
    day: "Day 6 — Revisions",
    description: "I apply your feedback and polish every detail.",
  },
  {
    day: "Day 7 — Launch",
    description: "Domain connected, site live, full handoff walkthrough. You own everything.",
  },
];

const Aurora = dynamic(() => import("./components/ui/Aurora"), { ssr: false });
const BorderGlow = dynamic(() => import("./components/ui/BorderGlow"), { ssr: false });
const ElectricBorder = dynamic(() => import("./components/ui/ElectricBorder"), { ssr: false });
const RotatingText = dynamic(() => import("./components/ui/RotatingText"), { ssr: false });
const SpecularButton = dynamic(() => import("./components/ui/SpecularButton"), { ssr: false });
const TextType = dynamic(() => import("./components/ui/TextType"), { ssr: false });

const pricingCards = [
  {
    title: "Starter Website",
    price: "Rs. 20,000",
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Contact form",
      "SEO basics",
      "1 revision round",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    title: "Business Website",
    price: "Rs. 35,000",
    features: [
      "Up to 10 pages",
      "Animations",
      "WhatsApp integration",
      "Google Maps",
      "Blog setup",
      "2 revision rounds",
    ],
    cta: "Book a Free Demo",
    featured: true,
    badge: "Most Popular",
  },
  {
    title: "Add-ons",
    price: "Custom",
    features: [
      "Domain Setup — Rs. 3,000/yr",
      "WhatsApp Bot — Rs. 5,000 one-time",
      "Monthly Maintenance — Rs. 2,500/mo",
    ],
    cta: "Ask Me Anything",
    featured: false,
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text-primary)]">
      <StaggeredMenu
        position="right"
        colors={["#1a1a1a", "#e8651a"]}
        logoUrl="/logo.svg"
        menuButtonColor="#f0ede6"
        openMenuButtonColor="#f0ede6"
        accentColor="#e8651a"
        changeMenuColorOnOpen
        displaySocials
        displayItemNumbering
        items={[
          { label: "Work", ariaLabel: "View my work", link: "#work" },
          { label: "Process", ariaLabel: "My process", link: "#process" },
          { label: "Pricing", ariaLabel: "Pricing", link: "#pricing" },
          { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
        ]}
        socialItems={[
          { label: "Instagram", link: "https://instagram.com/customwebcraft" },
          { label: "Email", link: "mailto:thecreative956@gmail.com" },
        ]}
      />

<section
  id="hero"
  style={{
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#080808',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Aurora colorStops={["#e8651a", "#1a1a1a", "#e8651a"]} blend={0.35} amplitude={0.8} speed={0.3} />
        </div>

        {/* Hero wordmark */}
<div style={{ position: 'relative', zIndex: 1, width: '100%', textAlign: 'center' }}>
            <BlurText
            text="customwebcraft"
            delay={80}
            animateBy="characters"
            direction="top"
            startOnView={false}
            className="hero-wordmark"
            stepDuration={0.4}
          />
        </div>

        {/* Copy — bottom, normal flow */}
<div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center', marginTop: '2rem' }}>    <div style={{
  fontSize: 'clamp(1rem, 4vw, 1.4rem)',
  fontWeight: 500,
  color: '#f0ede6',
  maxWidth: '90vw',
  lineHeight: 1.5,
  marginBottom: '1.25rem',
  minHeight: '3.8rem',
  textAlign: 'center',
  padding: '0 1rem',
  wordBreak: 'break-word',
}}>
  Websites for{' '}
  <span style={{ color: '#e8651a', fontWeight: 700 }}>local businesses</span>
  {' '}that deserve to look as good online as they do in person.
</div>

    <div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
  color: '#888880',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: '90vw',
  overflow: 'hidden',
}}>
  <span style={{ color: '#888880' }}>For</span>
  <span style={{
    backgroundColor: 'rgba(232,101,26,0.15)',
    color: '#e8651a',
    padding: '2px 10px',
    borderRadius: '6px',
    fontWeight: 600,
    minWidth: '180px',
    textAlign: 'center',
    display: 'inline-block',
    overflow: 'hidden',
  }}>
    <RotatingText
      texts={["cafes & coffee shops","salons & spas","clothing brands","restaurants","real estate agents","freelancers","ecommerce stores","medical clinics","law firms","gyms & fitness studios","educational institutes","tour & travel agencies","auto workshops","interior designers","wedding planners"]}
      mainClassName=""
      staggerFrom="last"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.03}
      splitLevelClassName="overflow-hidden"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  </span>
</div>

    <ElectricBorder color="#e8651a" speed={0.8} chaos={0.08} borderRadius={14} style={{ display: 'inline-block' }}>
      <SpecularButton size="lg" radius={14} tint="#e8651a" tintOpacity={0.12} textColor="#f0ede6" lineColor="#e8651a" baseColor="#5a2a0a" intensity={1.2} shineSize={12} shineFade={45} followMouse={true} proximity={300} onClick={() => window.open('mailto:thecreative956@gmail.com?subject=Book a Free Demo', '_blank')}>
        Book a Free Demo →
      </SpecularButton>
    </ElectricBorder>
  </div>

</section>

      <SectionReveal id="work" delay={0.04} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f0ede6", marginBottom: "3rem" }}>
          My Work
        </h2>

        <div style={{ display: "flex", gap: "1.5rem", overflowX: "auto", paddingBottom: "1rem", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }} className="work-scroll">
          <style>{`.work-scroll::-webkit-scrollbar { display: none; }`}</style>
          {projects.map((project) => (
            <BorderGlow
              key={project.name}
              glowColor="20 70 60"
              backgroundColor="#0f0f0f"
              borderRadius={16}
              glowRadius={32}
              glowIntensity={1.2}
              animated={true}
              colors={["#e8651a", "#5a2a0a", "#f0ede6"]}
              style={{ minWidth: "340px", maxWidth: "420px", flex: "0 0 auto", scrollSnapAlign: "start" }}
            >
              <div style={{ overflow: "hidden", height: "240px", borderRadius: "12px 12px 0 0" }}>
                {project.imageSrc ? (
                  <Image
                    src={project.imageSrc}
                    alt={`${project.name} website screenshot`}
                    width={800}
                    height={600}
                    style={{ width: "100%", height: "auto", display: "block", animation: "panDown 8s ease-in-out infinite alternate" }}
                  />
                ) : (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 30% 20%, rgba(232,101,26,0.35), transparent 60%), #141414", color: "#f0ede6", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-1px" }}>
                    {project.url.replace(/^https:\/\/(www\.)?/, "")}
                  </div>
                )}
              </div>
              <div style={{ padding: "1.25rem" }}>
                <p style={{ color: "#e8651a", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>{project.label}</p>
                <h3 style={{ color: "#f0ede6", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{project.name}</h3>
                <p style={{ color: "#888880", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1rem" }}>{project.description}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ background: "rgba(232,101,26,0.1)", color: "#e8651a", padding: "3px 10px", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1rem", color: "#f0ede6", fontWeight: 600, fontSize: "0.85rem", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                  Visit live site →
                </a>
              </div>
            </BorderGlow>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="process" delay={0.06} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <h2 style={{ fontSize: "clamp(4rem, 12vw, 10rem)", fontWeight: 900, color: "#f0ede6", textTransform: "uppercase", letterSpacing: "-4px", lineHeight: 0.9, margin: 0 }}>
            PROCESS
          </h2>
        </div>

        <p style={{ color: "#888880", fontSize: "1rem", marginBottom: "3rem" }}>
          How It Works — 1 Week to Launch
        </p>

        <Stepper initialStep={1} onFinalStepCompleted={() => {}} nextButtonText="Next Day →" backButtonText="← Back" stepCircleContainerClassName="process-stepper">
          {processSteps.map((step) => (
            <Stepper.Step key={step.day}>
              <h3 style={{ color: "#f0ede6", fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.5rem" }}>{step.day}</h3>
              <p style={{ color: "#888880", lineHeight: 1.6 }}>{step.description}</p>
            </Stepper.Step>
          ))}
        </Stepper>
      </SectionReveal>

      <SectionReveal id="pricing" delay={0.08} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <h2 style={{ fontSize: "clamp(4rem, 12vw, 10rem)", fontWeight: 900, color: "#f0ede6", textTransform: "uppercase", letterSpacing: "-4px", lineHeight: 0.9, margin: 0 }}>
            PRICING
          </h2>
        </div>
        <p style={{ color: "#888880", fontSize: "1rem", marginBottom: "3rem" }}>Simple, transparent. Negotiable.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {pricingCards.map((card) => (
            <BorderGlow
              key={card.title}
              glowColor={card.featured ? "25 80 60" : "20 50 50"}
              backgroundColor="#0f0f0f"
              borderRadius={16}
              animated={Boolean(card.featured)}
              glowIntensity={card.featured ? 1.5 : 1}
              colors={card.featured ? ["#e8651a", "#5a2a0a", "#c4531a"] : ["#333", "#222", "#444"]}
            >
              <div className="rounded-[14px] bg-[var(--bg-2)] p-6">
                {card.featured ? (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">{card.title}</h3>
                      <span className="rounded-full bg-[rgba(232,101,26,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-orange)]">
                        {card.badge}
                      </span>
                    </div>
                    <p className="mt-5 text-4xl font-semibold text-[var(--text-primary)]">{card.price}</p>
                    <ul className="mt-5 space-y-3 text-sm text-[var(--text-muted)]">
                      {card.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 text-[var(--accent-orange)]">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <SpecularButton size="md" radius={12} tint="#e8651a" textColor="#f0ede6" lineColor="#e8651a" baseColor="#5a2a0a">
                        {card.cta}
                      </SpecularButton>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{card.title}</h3>
                    <p className="mt-5 text-4xl font-semibold text-[var(--text-primary)]">{card.price}</p>
                    <ul className="mt-5 space-y-3 text-sm text-[var(--text-muted)]">
                      {card.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 text-[var(--accent-orange)]">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <a href={card.title === "Add-ons" ? "mailto:thecreative956@gmail.com" : "mailto:thecreative956@gmail.com?subject=Book a Free Demo"} className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-transparent px-5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-orange)] hover:text-[var(--accent-orange)]">
                        {card.cta}
                      </a>
                    </div>
                  </>
                )}
              </div>
            </BorderGlow>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="contact" delay={0.1} className="mx-auto w-full max-w-6xl px-5 pb-24 pt-20 sm:px-8 lg:pt-24">
        <section style={{ padding: "6rem 1.5rem 4rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ overflow: "hidden", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(3.5rem, 15vw, 10rem)", fontWeight: 900, color: "#f0ede6", textTransform: "uppercase", letterSpacing: "-6px", lineHeight: 0.85, margin: 0, whiteSpace: "normal", wordBreak: "break-word" }}>
              LET&apos;S BUILD
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ maxWidth: "420px" }}>
              <p style={{ color: "#888880", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>
                GOT A QUESTION, PROJECT, OR WANT TO WORK TOGETHER ON SOMETHING?
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <a href="mailto:thecreative956@gmail.com?subject=Let's work together!" style={{ color: "#f0ede6", textDecoration: "underline", fontWeight: 600, textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" }}>
                  SEND ME AN EMAIL
                </a>
                <span style={{ color: "#888880" }}>OR</span>
                <a href="https://instagram.com/customwebcraft" target="_blank" rel="noopener noreferrer" style={{ color: "#f0ede6", textDecoration: "underline", fontWeight: 600, textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" }}>
                  DM ON INSTAGRAM
                </a>
              </div>
            </div>

            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <a href="https://instagram.com/customwebcraft" target="_blank" rel="noopener noreferrer" style={{ color: "#f0ede6", fontWeight: 600, fontSize: "1rem" }}>Instagram</a>
              <a href="mailto:thecreative956@gmail.com" style={{ color: "#f0ede6", fontWeight: 600, fontSize: "1rem" }}>Email</a>
            </div>
          </div>
        </section>
      </SectionReveal>

      <footer className="border-t border-[rgba(255,255,255,0.07)] bg-[var(--bg)] py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-sm text-[var(--text-muted)] sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>customwebcraft © 2025 — Built in Karachi</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/customwebcraft" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-orange)]">
              Instagram
            </a>
            <a href="mailto:thecreative956@gmail.com" className="hover:text-[var(--accent-orange)]">
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
