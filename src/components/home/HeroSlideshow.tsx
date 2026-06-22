"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HERO_SLIDE_INTERVAL_MS,
  HERO_SLIDES,
} from "@/lib/data/hero";

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        );
      })}
    </div>
  );
}
