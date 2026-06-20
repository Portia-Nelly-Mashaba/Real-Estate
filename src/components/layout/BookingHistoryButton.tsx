"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CalendarClock, X } from "lucide-react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBookings } from "@/hooks/useBookings";
import { formatDisplayDate } from "@/lib/booking/availability";
import { BOOKING_HREF } from "@/lib/constants";

interface BookingHistoryButtonProps {
  className?: string;
}

export function BookingHistoryButton({ className = "" }: BookingHistoryButtonProps) {
  const mounted = useHasMounted();
  const { bookings } = useBookings();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full p-2 transition-colors duration-300 hover:bg-nav-active/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={
          mounted && bookings.length > 0
            ? `Viewing history, ${bookings.length} bookings`
            : "Viewing history"
        }
      >
        <CalendarClock className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        {mounted && bookings.length > 0 ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-gold-light" />
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Viewing appointment history"
          className="booking-history-panel fixed right-4 top-[4.25rem] z-[60] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border/40 bg-white shadow-elevated lg:absolute lg:right-0 lg:top-[calc(100%+0.5rem)] lg:w-[min(22rem,calc(100vw-2rem))]"
        >
          <div className="flex items-center justify-between border-b border-border/25 px-4 py-3">
            <p className="font-display text-sm font-semibold text-foreground">
              Viewing history
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-muted transition-colors hover:text-foreground"
              aria-label="Close history"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {!mounted || bookings.length === 0 ? (
              <div className="px-3 py-6 text-center">
                <p className="text-sm text-muted">No viewings booked yet.</p>
                <Link
                  href={BOOKING_HREF}
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-block text-sm font-medium text-accent hover:text-accent-hover"
                >
                  Book a viewing
                </Link>
              </div>
            ) : (
              <ul className="space-y-1">
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    <div className="rounded-lg px-3 py-2.5 transition-colors hover:bg-brown-light">
                      <p className="text-sm font-medium leading-snug text-foreground">
                        {booking.propertyTitle}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {formatDisplayDate(booking.date)} · {booking.time}
                      </p>
                      <p className="mt-1 text-xs text-muted">{booking.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
