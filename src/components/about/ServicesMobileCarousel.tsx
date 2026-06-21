"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/about/ServiceCard";
import type { ServiceOffering } from "@/lib/data/services";

interface ServicesMobileCarouselProps {
  offerings: ServiceOffering[];
}

export function ServicesMobileCarousel({ offerings }: ServicesMobileCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || offerings.length === 0) return;

    const slides = Array.from(scroller.children) as HTMLElement[];
    const center = scroller.scrollLeft + scroller.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, [offerings.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateActiveIndex();
    scroller.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  function scrollToSlide(index: number) {
    const scroller = scrollerRef.current;
    const slide = scroller?.children[index] as HTMLElement | undefined;
    if (!slide) return;

    slide.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  }

  return (
    <div className="mt-10 lg:hidden">
      <ul
        ref={scrollerRef}
        className="testimonials-carousel -mx-4 flex gap-4 overflow-x-auto px-4 pb-1 scroll-smooth snap-x snap-mandatory"
        aria-label="Our services"
      >
        {offerings.map((offering, index) => (
          <li
            key={offering.id}
            className="testimonials-carousel-slide flex w-[88%] max-w-md shrink-0 snap-center sm:w-[78%]"
            aria-label={`Service ${index + 1} of ${offerings.length}: ${offering.title}`}
          >
            <ServiceCard offering={offering} />
          </li>
        ))}
      </ul>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Choose service"
      >
        {offerings.map((offering, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={offering.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show ${offering.title}`}
              onClick={() => scrollToSlide(index)}
              className={
                isActive
                  ? "services-carousel-dot services-carousel-dot-active"
                  : "services-carousel-dot"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
