"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDisplayDate } from "@/lib/booking/availability";
import { sendBookingNotification } from "@/lib/booking/notifications";
import { buildWhatsAppUrl } from "@/lib/booking/whatsapp";
import type { ViewingBooking } from "@/lib/booking/types";
interface BookingConfirmationProps {
  booking: ViewingBooking;
  onReset: () => void;
}

export function BookingConfirmation({ booking, onReset }: BookingConfirmationProps) {
  const whatsAppUrl = buildWhatsAppUrl(booking);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function notifyTeam() {
      const result = await sendBookingNotification(booking);
      if (cancelled || !result.ok) return;

      setNotificationSent(true);
    }

    void notifyTeam();

    return () => {
      cancelled = true;
    };
  }, [booking]);

  return (
    <div className="booking-confirmation-card">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-deep text-hero-text">
        <Check className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
      </div>

      <p className="mt-6 text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
        Reserved
      </p>
      <h2 className="mt-2 font-serif text-2xl font-medium text-foreground sm:text-3xl">
        Your viewing is provisionally booked.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
        {notificationSent
          ? "Our team has been notified by email and WhatsApp. Tap the button below to send your details directly too."
          : "We'll confirm by email and WhatsApp shortly. Tap the button below to send your details directly to our team."}
      </p>

      <dl className="booking-confirmation-details mx-auto mt-8 max-w-md">
        <div>
          <dt>Property</dt>
          <dd>
            {booking.propertyTitle}, {booking.propertyLocation}
          </dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatDisplayDate(booking.date)}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{booking.time}</dd>
        </div>
        <div>
          <dt>Name</dt>
          <dd>{booking.name}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hero-browse inline-flex w-full sm:w-auto"
        >
          Send on WhatsApp
        </a>
        <Link
          href="/gallery"
          onClick={onReset}
          className="btn-hero-browse inline-flex w-full sm:w-auto"
        >
          Browse more homes
        </Link>
      </div>
    </div>
  );
}
