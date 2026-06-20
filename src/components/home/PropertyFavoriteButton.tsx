"use client";

import { Heart } from "lucide-react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useFavorites } from "@/hooks/useFavorites";

interface PropertyFavoriteButtonProps {
  propertyId: string;
  propertyTitle: string;
}

export function PropertyFavoriteButton({
  propertyId,
  propertyTitle,
}: PropertyFavoriteButtonProps) {
  const mounted = useHasMounted();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = mounted && isFavorite(propertyId);

  return (
    <button
      type="button"
      className="property-favorite-btn"
      aria-pressed={mounted ? saved : undefined}
      aria-label={
        mounted && saved
          ? `Remove ${propertyTitle} from favourites`
          : `Save ${propertyTitle} to favourites`
      }
      suppressHydrationWarning
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(propertyId);
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
