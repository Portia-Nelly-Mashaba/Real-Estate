"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PHOTO_GALLERY_FILTERS,
  filterPhotoGalleryItems,
  type PhotoGalleryCategory,
} from "@/lib/data/photo-gallery";

export function PhotoGalleryGrid() {
  const [category, setCategory] = useState<PhotoGalleryCategory>("all");
  const items = filterPhotoGalleryItems(category);

  return (
    <>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter gallery by category"
      >
        {PHOTO_GALLERY_FILTERS.map((filter) => {
          const isActive = category === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(filter.value)}
              className={
                isActive
                  ? "photo-gallery-filter photo-gallery-filter-active"
                  : "photo-gallery-filter"
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted">
        {items.length} {items.length === 1 ? "photo" : "photos"}
      </p>

      <div className="gallery-results-area">
        <div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="photo-gallery-card group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="font-serif text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{item.location}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-sm text-muted">
            Want full details and pricing?{" "}
            <Link
              href="/gallery"
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Browse all properties
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
