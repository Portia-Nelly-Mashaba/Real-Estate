"use client";

import { useCallback, useEffect, useState } from "react";
import { FAVORITES_UPDATED_EVENT } from "@/lib/favorites/config";
import {
  getFavoriteIds,
  isFavoriteId,
  toggleFavoriteId,
} from "@/lib/favorites/storage";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setFavoriteIds(getFavoriteIds());
  }, []);

  useEffect(() => {
    refresh();

    function handleUpdate() {
      refresh();
    }

    window.addEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  const toggleFavorite = useCallback(
    (propertyId: string) => {
      const saved = toggleFavoriteId(propertyId);
      refresh();
      return saved;
    },
    [refresh],
  );

  const isFavorite = useCallback(
    (propertyId: string) => isFavoriteId(propertyId, favoriteIds),
    [favoriteIds],
  );

  return {
    favoriteIds,
    favoriteCount: favoriteIds.length,
    isFavorite,
    toggleFavorite,
    refresh,
  };
}
