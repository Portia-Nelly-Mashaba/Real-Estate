"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface PropertyFavoriteButtonProps {
  propertyTitle: string;
}

export function PropertyFavoriteButton({
  propertyTitle,
}: PropertyFavoriteButtonProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      className="property-favorite-btn"
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${propertyTitle} from saved properties`
          : `Save ${propertyTitle} to favorites`
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setSaved((current) => !current);
      }}
    >
      <Heart
        className={`h-[1.125rem] w-[1.125rem] stroke-[1.75] ${
          saved
            ? "fill-red-500 text-red-500"
            : "fill-none text-hero-text"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
