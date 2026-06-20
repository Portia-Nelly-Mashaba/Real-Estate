import { WHATSAPP_DEMO_NUMBER } from "@/lib/booking/config";
import { formatDisplayDate } from "@/lib/booking/availability";
import type { ViewingBooking } from "@/lib/booking/types";

export function buildWhatsAppMessage(booking: ViewingBooking): string {
  const lines = [
    "Hello, I'd like to book a property viewing with Mashaba Property.",
    "",
    `Property: ${booking.propertyTitle}, ${booking.propertyLocation}`,
    `Date: ${formatDisplayDate(booking.date)}`,
    `Time: ${booking.time}`,
    "",
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
  ];

  if (booking.notes?.trim()) {
    lines.push(`Notes: ${booking.notes.trim()}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(booking: ViewingBooking): string {
  const message = buildWhatsAppMessage(booking);
  return `https://wa.me/${WHATSAPP_DEMO_NUMBER}?text=${encodeURIComponent(message)}`;
}
