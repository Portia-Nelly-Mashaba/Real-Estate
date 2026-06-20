import { VIEWING_TIME_SLOTS } from "@/lib/booking/config";
import type { ViewingBooking } from "@/lib/booking/types";

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isPastDate(date: Date): boolean {
  const today = startOfDay(new Date());
  return startOfDay(date) < today;
}

export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

export function isBusinessDay(date: Date): boolean {
  return !isPastDate(date) && !isSunday(date);
}

export function getBookingsForPropertyDate(
  bookings: ViewingBooking[],
  propertyId: string,
  dateKey: string,
): ViewingBooking[] {
  return bookings.filter(
    (booking) =>
      booking.propertyId === propertyId && booking.date === dateKey,
  );
}

export function isSlotBooked(
  bookings: ViewingBooking[],
  propertyId: string,
  dateKey: string,
  time: string,
): boolean {
  return getBookingsForPropertyDate(bookings, propertyId, dateKey).some(
    (booking) => booking.time === time,
  );
}

export function normalizeBookingEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Same visitor cannot hold two viewings at the same date and time. */
export function isUserSlotBooked(
  bookings: ViewingBooking[],
  dateKey: string,
  time: string,
  email: string,
): boolean {
  const normalizedEmail = normalizeBookingEmail(email);
  if (!normalizedEmail) return false;

  return bookings.some(
    (booking) =>
      booking.date === dateKey &&
      booking.time === time &&
      normalizeBookingEmail(booking.email) === normalizedEmail,
  );
}

export function isSlotUnavailable(
  bookings: ViewingBooking[],
  propertyId: string,
  dateKey: string,
  time: string,
  email?: string,
): boolean {
  if (isSlotBooked(bookings, propertyId, dateKey, time)) return true;
  if (email && isUserSlotBooked(bookings, dateKey, time, email)) return true;
  return false;
}

export function getAvailableSlots(
  bookings: ViewingBooking[],
  propertyId: string,
  dateKey: string,
): string[] {
  return VIEWING_TIME_SLOTS.filter(
    (slot) => !isSlotBooked(bookings, propertyId, dateKey, slot),
  );
}

export function isDateFullyBooked(
  bookings: ViewingBooking[],
  propertyId: string,
  dateKey: string,
): boolean {
  return getAvailableSlots(bookings, propertyId, dateKey).length === 0;
}

export function isDateSelectable(
  bookings: ViewingBooking[],
  propertyId: string,
  date: Date,
): boolean {
  if (!propertyId) return false;
  if (!isBusinessDay(date)) return false;
  return !isDateFullyBooked(bookings, propertyId, toDateKey(date));
}

export interface CalendarCell {
  date: Date | null;
  dateKey: string | null;
}

export function getCalendarCells(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: null, dateKey: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({ date, dateKey: toDateKey(date) });
  }

  return cells;
}

export function formatDisplayDate(dateKey: string): string {
  return parseDateKey(dateKey).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(dateKey: string): string {
  return parseDateKey(dateKey).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

export function isSameDate(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return toDateKey(a) === toDateKey(b);
}
