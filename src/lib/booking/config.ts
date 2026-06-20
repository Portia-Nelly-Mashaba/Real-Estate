import { VIEWING_HOURS_DESCRIPTION } from "@/lib/data/hours";

/** Last slot is 16:00 (1-hour viewings within 09:00–17:00; 12:00–14:00 lunch gap). */
export const BOOKING_PAGE = {
  label: "Book a Viewing",
  lead: "Reserve a private viewing.",
  description: VIEWING_HOURS_DESCRIPTION,
} as const;

export const VIEWING_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export type ViewingTimeSlot = (typeof VIEWING_TIME_SLOTS)[number];

/** Demo WhatsApp number for assessment submission */
export const WHATSAPP_DEMO_NUMBER = "27825550142";

export const BOOKINGS_STORAGE_KEY = "mashaba-viewing-bookings";
export const BOOKINGS_UPDATED_EVENT = "mashaba-bookings-updated";
