import {
  BOOKINGS_STORAGE_KEY,
  BOOKINGS_UPDATED_EVENT,
} from "@/lib/booking/config";
import {
  isSlotBooked,
  isUserSlotBooked,
  normalizeBookingEmail,
} from "@/lib/booking/availability";
import type { ViewingBooking } from "@/lib/booking/types";

function isViewingBooking(value: unknown): value is ViewingBooking {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.propertyId === "string" &&
    typeof record.date === "string" &&
    typeof record.time === "string"
  );
}

export function getBookings(): ViewingBooking[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isViewingBooking);
  } catch {
    return [];
  }
}

export function saveBooking(
  booking: Omit<ViewingBooking, "id" | "createdAt">,
): ViewingBooking {
  const existing = getBookings();

  if (
    isSlotBooked(existing, booking.propertyId, booking.date, booking.time) ||
    isUserSlotBooked(existing, booking.date, booking.time, booking.email)
  ) {
    throw new Error("That viewing slot is no longer available.");
  }

  const entry: ViewingBooking = {
    ...booking,
    email: normalizeBookingEmail(booking.email),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    BOOKINGS_STORAGE_KEY,
    JSON.stringify([entry, ...existing]),
  );
  window.dispatchEvent(new Event(BOOKINGS_UPDATED_EVENT));
  return entry;
}

export function notifyBookingsUpdated(): void {
  window.dispatchEvent(new Event(BOOKINGS_UPDATED_EVENT));
}
