"use client";

import { useEffect, useState } from "react";
import { SITE_TAGLINE } from "@/lib/constants";

export function HeroTagline() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY <= 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      className={`pointer-events-none absolute left-5 top-10 z-10 hidden origin-top-left rotate-90 whitespace-nowrap font-display text-xs font-normal uppercase tracking-[0.25em] text-hero-text/55 transition-opacity duration-300 sm:left-6 lg:top-12 xl:left-8 ${
        visible ? "opacity-100" : "opacity-0"
      } lg:block`}
      aria-hidden="true"
    >
      {SITE_TAGLINE}
    </span>
  );
}
