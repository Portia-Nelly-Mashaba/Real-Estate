"use client";

import { Clock3 } from "lucide-react";
import { isSlotUnavailable, toDateKey } from "@/lib/booking/availability";
import { VIEWING_TIME_SLOTS } from "@/lib/booking/config";
import type { ViewingBooking } from "@/lib/booking/types";

interface BookingTimeSlotsProps {
  propertyId: string;
  selectedDate: Date | null;
  selectedTime: string | null;
  bookings: ViewingBooking[];
  userEmail?: string;
  onSelectTime: (time: string) => void;
}

export function BookingTimeSlots({
  propertyId,
  selectedDate,
  selectedTime,
  bookings,
  userEmail,
  onSelectTime,
}: BookingTimeSlotsProps) {
  const dateKey = selectedDate ? toDateKey(selectedDate) : null;

  return (
    <div className="booking-step-card">
      <div className="flex items-center gap-2">
        <Clock3 className="h-4 w-4 text-accent" aria-hidden="true" />
        <h2 className="font-serif text-lg font-semibold text-foreground">
          3. Choose a time
        </h2>
      </div>

      {!propertyId || !dateKey ? (
        <p className="mt-4 text-sm text-muted">
          Pick a date first to see available time slots.
        </p>
      ) : (
        <div
          className="mt-5 flex flex-wrap gap-2"
          role="group"
          aria-label="Available viewing times"
        >
          {VIEWING_TIME_SLOTS.map((slot) => {
            const unavailable = isSlotUnavailable(
              bookings,
              propertyId,
              dateKey,
              slot,
              userEmail,
            );
            const isSelected = selectedTime === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={unavailable}
                onClick={() => onSelectTime(slot)}
                aria-pressed={isSelected}
                className={
                  unavailable
                    ? "booking-time-slot booking-time-slot-unavailable"
                    : isSelected
                      ? "booking-time-slot booking-time-slot-selected"
                      : "booking-time-slot booking-time-slot-available"
                }
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
