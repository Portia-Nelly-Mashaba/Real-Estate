import {
  FAVORITES_STORAGE_KEY,
  FAVORITES_UPDATED_EVENT,
} from "@/lib/favorites/config";

function readFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

function persistFavoriteIds(ids: string[]): void {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
}

export function getFavoriteIds(): string[] {
  return readFavoriteIds();
}

export function isFavoriteId(propertyId: string, ids = getFavoriteIds()): boolean {
  return ids.includes(propertyId);
}

/** Returns the new saved state after toggling. */
export function toggleFavoriteId(propertyId: string): boolean {
  const existing = readFavoriteIds();
  const isSaved = existing.includes(propertyId);

  if (isSaved) {
    persistFavoriteIds(existing.filter((id) => id !== propertyId));
    return false;
  }

  persistFavoriteIds([propertyId, ...existing]);
  return true;
}
