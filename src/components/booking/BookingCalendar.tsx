"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import {
  formatMonthYear,
  getCalendarCells,
  isBusinessDay,
  isDateFullyBooked,
  isSameDate,
  toDateKey,
} from "@/lib/booking/availability";
import type { ViewingBooking } from "@/lib/booking/types";

interface BookingCalendarProps {
  propertyId: string;
  selectedDate: Date | null;
  bookings: ViewingBooking[];
  onSelectDate: (date: Date) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookingCalendar({
  propertyId,
  selectedDate,
  bookings,
  onSelectDate,
}: BookingCalendarProps) {
  const [viewYear, setViewYear] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }, []);

  const cells =
    viewYear !== null && viewMonth !== null
      ? getCalendarCells(viewYear, viewMonth)
      : [];

  function goToPreviousMonth() {
    if (viewMonth === null || viewYear === null) return;

    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
      return;
    }
    setViewMonth(viewMonth - 1);
  }

  function goToNextMonth() {
    if (viewMonth === null || viewYear === null) return;

    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
      return;
    }
    setViewMonth(viewMonth + 1);
  }

  function getDayState(date: Date): "unavailable" | "available" | "selected" {
    if (isSameDate(date, selectedDate)) return "selected";
    if (!propertyId) return "unavailable";
    if (!isBusinessDay(date)) return "unavailable";
    if (isDateFullyBooked(bookings, propertyId, toDateKey(date))) {
      return "unavailable";
    }
    return "available";
  }

  return (
    <div className="booking-step-card">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
        <h2 className="font-serif text-lg font-semibold text-foreground">
          2. Pick a date
        </h2>
      </div>

      {!propertyId ? (
        <p className="mt-4 text-sm text-muted">
          Select a property first to see available dates.
        </p>
      ) : viewYear === null || viewMonth === null ? (
        <div className="mt-5 h-[18rem] animate-pulse rounded-xl bg-border/20" />
      ) : (
        <>
          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="booking-calendar-nav"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="font-display text-sm font-semibold text-foreground">
              {formatMonthYear(viewYear, viewMonth)}
            </p>
            <button
              type="button"
              onClick={goToNextMonth}
              className="booking-calendar-nav"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-1 text-[0.6875rem] font-display font-semibold uppercase tracking-wide text-muted"
              >
                {day}
              </span>
            ))}

            {cells.map((cell, index) => {
              if (!cell.date) {
                return <span key={`empty-${index}`} aria-hidden="true" />;
              }

              const state = getDayState(cell.date);
              const isSelected = state === "selected";
              const isUnavailable = state === "unavailable";
              const label = cell.date.toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => onSelectDate(cell.date!)}
                  aria-label={label}
                  aria-pressed={isSelected}
                  className={
                    isSelected
                      ? "booking-calendar-day booking-calendar-day-selected"
                      : isUnavailable
                        ? "booking-calendar-day booking-calendar-day-unavailable"
                        : "booking-calendar-day booking-calendar-day-available"
                  }
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-charcoal-deep" />
              Selected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-border/50" />
              Unavailable (Sundays / past / fully booked)
            </span>
          </div>
        </>
      )}
    </div>
  );
}
