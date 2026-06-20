"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useFavorites } from "@/hooks/useFavorites";
import { FAVORITES_HREF } from "@/lib/constants";

interface FavoritesButtonProps {
  className?: string;
}

export function FavoritesButton({ className = "" }: FavoritesButtonProps) {
  const mounted = useHasMounted();
  const { favoriteCount } = useFavorites();

  return (
    <Link
      href={FAVORITES_HREF}
      className={`relative rounded-full p-2 transition-colors duration-300 hover:bg-nav-active/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light ${className}`}
      aria-label={
        mounted && favoriteCount > 0
          ? `Your favourites, ${favoriteCount} properties saved`
          : "Your favourites"
      }
    >
      <Heart className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      {mounted && favoriteCount > 0 ? (
        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-light px-1 text-[0.625rem] font-bold leading-none text-[#1a1a1a]">
          {favoriteCount}
        </span>
      ) : null}
    </Link>
  );
}
