"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PropertiesListing } from "@/components/gallery/PropertiesListing";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useFavorites } from "@/hooks/useFavorites";
import { ALL_PROPERTIES } from "@/lib/data/properties";

export function FavoritesListing() {
  const mounted = useHasMounted();
  const { favoriteIds } = useFavorites();

  const favorites = useMemo(
    () => ALL_PROPERTIES.filter((property) => favoriteIds.includes(property.id)),
    [favoriteIds],
  );

  if (!mounted) {
    return (
      <div
        className="mt-8 h-32 animate-pulse rounded-2xl border border-border/40 bg-white/70 shadow-card"
        aria-hidden="true"
      />
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border/40 bg-white px-6 py-14 text-center shadow-card">
        <p className="font-serif text-2xl text-foreground">No favourites yet</p>
        <p className="mt-3 text-sm text-muted">
          Tap the heart on any property to save it here.
        </p>
        <Link
          href="/gallery"
          className="btn-primary mt-8 inline-flex px-7"
        >
          Browse properties
        </Link>
      </div>
    );
  }

  return (
    <PropertiesListing
      properties={favorites}
      countLabel={(count) =>
        `${count} ${count === 1 ? "property" : "properties"} found`
      }
      emptyTitle="No favourites match your filters"
      emptyMessage="Try adjusting your search or reset the filters."
    />
  );
}
