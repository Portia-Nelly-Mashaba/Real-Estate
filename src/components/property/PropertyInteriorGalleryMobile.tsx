"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PropertyImage } from "@/lib/data/properties";

interface PropertyInteriorGalleryMobileProps {
  images: PropertyImage[];
  propertyTitle: string;
}

export function PropertyInteriorGalleryMobile({
  images,
  propertyTitle,
}: PropertyInteriorGalleryMobileProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || images.length === 0) return;

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
  }, [images.length]);

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
    const slide = scrollerRef.current?.children[index] as HTMLElement | undefined;
    if (!slide) return;

    slide.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(index);
  }

  return (
    <div className="mt-5 sm:hidden">
      <ul
        ref={scrollerRef}
        className="testimonials-carousel -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scroll-smooth snap-x snap-mandatory"
        aria-label={`${propertyTitle} interior photos`}
      >
        {images.map((photo, index) => (
          <li
            key={photo.src}
            className="relative aspect-[4/3] w-[88%] max-w-md shrink-0 snap-center overflow-hidden rounded-xl border border-border/50 bg-white shadow-[0_4px_20px_rgba(26,26,26,0.06)]"
            aria-label={`Interior photo ${index + 1} of ${images.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="88vw"
              priority={index === 0}
            />
          </li>
        ))}
      </ul>

      {images.length > 1 ? (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Choose interior photo"
        >
          {images.map((photo, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show photo ${index + 1}`}
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
      ) : null}
    </div>
  );
}
