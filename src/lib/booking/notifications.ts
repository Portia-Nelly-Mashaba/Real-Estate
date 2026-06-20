import { formatDisplayDate } from "@/lib/booking/availability";
import type { ViewingBooking } from "@/lib/booking/types";

export interface BookingNotificationResult {
  ok: boolean;
  message: string;
}

export async function sendBookingNotification(
  booking: ViewingBooking,
): Promise<BookingNotificationResult> {
  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: booking.propertyId,
        propertyTitle: booking.propertyTitle,
        propertyLocation: booking.propertyLocation,
        date: booking.date,
        time: booking.time,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        notes: booking.notes,
      }),
    });

    const data = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      return {
        ok: false,
        message: data.error ?? "Could not send notification.",
      };
    }

    return {
      ok: true,
      message: data.message ?? "Notification sent.",
    };
  } catch {
    return {
      ok: false,
      message: "Could not send notification.",
    };
  }
}

export async function showBrowserNotification(
  booking: ViewingBooking,
): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission !== "granted") return;

  new Notification("Viewing booked", {
    body: `${booking.propertyTitle} — ${formatDisplayDate(booking.date)} at ${booking.time}`,
  });
}
