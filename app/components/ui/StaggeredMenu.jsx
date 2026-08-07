"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./StaggeredMenu.css";

/** @typedef {{ label: string; ariaLabel?: string; link: string }} MenuItem */
/** @typedef {{ label: string; link: string }} SocialItem */

/**
 * @param {{
 *   position?: string;
 *   colors?: string[];
 *   logoUrl?: string;
 *   menuButtonColor?: string;
 *   openMenuButtonColor?: string;
 *   accentColor?: string;
 *   changeMenuColorOnOpen?: boolean;
 *   displaySocials?: boolean;
 *   displayItemNumbering?: boolean;
 *   items?: MenuItem[];
 *   socialItems?: SocialItem[];
 * }} props
 */
export default function StaggeredMenu(props) {
  const {
    position = "right",
    colors = ["#1a1a1a", "#e8651a"],
    logoUrl = "/logo.svg",
    menuButtonColor = "#f0ede6",
    openMenuButtonColor = "#f0ede6",
    accentColor = "#e8651a",
    changeMenuColorOnOpen = true,
    displaySocials = true,
    displayItemNumbering = true,
    items: itemsProp,
    socialItems: socialItemsProp,
  } = props;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const resolvedItems = /** @type {MenuItem[]} */ (itemsProp ?? []);
  const resolvedSocialItems = /** @type {SocialItem[]} */ (socialItemsProp ?? []);

  useEffect(() => setMounted(true), []);

  const panelStyle = useMemo(() => ({
    background: open && changeMenuColorOnOpen ? colors[1] : colors[0],
    color: open ? openMenuButtonColor : menuButtonColor,
  }), [changeMenuColorOnOpen, colors, menuButtonColor, open, openMenuButtonColor]);

  if (!mounted) return null;

  return (
    <div className="staggered-menu-shell">
      <button
        type="button"
        aria-label="Toggle navigation"
        className="sm-menu-button fixed right-4 top-4 z-[120] rounded-full border border-white/10 bg-transparent p-3"
        style={{ color: open ? openMenuButtonColor : menuButtonColor }}
        onClick={() => setOpen((value) => !value)}
      >
        <span style={{ fontSize: "1.2rem" }}>{open ? "✕" : "☰"}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="staggered-menu-panel fixed inset-0 z-[110] flex flex-col justify-between px-6 py-20 sm:px-8"
            style={panelStyle}
          >
            <div className="flex items-center justify-between">
              <a href="#hero" onClick={() => setOpen(false)} className="text-xl font-semibold tracking-[-0.03em]" style={{ color: openMenuButtonColor }}>
                {logoUrl ? <span>customwebcraft</span> : "customwebcraft"}
              </a>
              <span className="text-sm uppercase tracking-[0.24em]" style={{ color: openMenuButtonColor }}>Menu</span>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-4 pt-8">
              {resolvedItems.map((item, index) => (
                <a
                  key={item.link}
                  href={item.link}
                  aria-label={item.ariaLabel}
                  onClick={() => setOpen(false)}
                  className="sm-panel-item flex items-center justify-between rounded-full border border-white/10 px-4 py-4 text-2xl font-semibold sm:text-3xl"
                  style={{ color: openMenuButtonColor }}
                >
                  <span>{item.label}</span>
                  {displayItemNumbering ? <span className="text-sm opacity-60">0{index + 1}</span> : null}
                </a>
              ))}
            </div>

            {displaySocials ? (
              <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                {resolvedSocialItems.map((social) => (
                  <a key={social.link} href={social.link} className="sm-socials-link text-sm uppercase tracking-[0.24em]" style={{ color: openMenuButtonColor }}>
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
