"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialsMobileCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsMobileCarousel({
  testimonials,
}: TestimonialsMobileCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || testimonials.length === 0) return;

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
  }, [testimonials.length]);

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
        aria-label="Client testimonials"
      >
        {testimonials.map((testimonial, index) => (
          <li
            key={testimonial.id}
            className="testimonials-carousel-slide flex w-[88%] max-w-md shrink-0 snap-center sm:w-[78%]"
            aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Choose testimonial"
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={testimonial.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show testimonial from ${testimonial.name}`}
              onClick={() => scrollToSlide(index)}
              className={
                isActive
                  ? "testimonials-carousel-dot testimonials-carousel-dot-active"
                  : "testimonials-carousel-dot"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
