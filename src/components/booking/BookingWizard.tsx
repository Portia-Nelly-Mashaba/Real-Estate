"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingTimeSlots } from "@/components/booking/BookingTimeSlots";
import { useNotificationToast } from "@/components/ui/NotificationToast";
import { useBookings } from "@/hooks/useBookings";
import { useHasMounted } from "@/hooks/useHasMounted";import {
  isSlotBooked,
  isUserSlotBooked,
  toDateKey,
} from "@/lib/booking/availability";
import type { BookingFormDetails, ViewingBooking } from "@/lib/booking/types";
import { ALL_PROPERTIES } from "@/lib/data/properties";

const EMPTY_FORM: BookingFormDetails = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function BookingWizardSkeleton() {
  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-10"
      aria-hidden="true"
    >
      <div className="space-y-5">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="booking-step-card animate-pulse">
            <div className="h-5 w-44 rounded bg-border/40" />
            <div className="mt-5 h-11 rounded-lg bg-border/25" />
          </div>
        ))}
      </div>
      <div className="booking-summary-card min-h-[22rem] animate-pulse" />
    </div>
  );
}

export function BookingWizard() {
  const mounted = useHasMounted();
  const searchParams = useSearchParams();

  const { bookings, addBooking } = useBookings();
  const { showToast, toast } = useNotificationToast();
  const [propertyId, setPropertyId] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<BookingFormDetails>(EMPTY_FORM);
  const [confirmedBooking, setConfirmedBooking] = useState<ViewingBooking | null>(
    null,
  );
  const [formError, setFormError] = useState<string | null>(null);

  const selectedProperty = useMemo(
    () => ALL_PROPERTIES.find((property) => property.id === propertyId) ?? null,
    [propertyId],
  );

  const dateKey = selectedDate ? toDateKey(selectedDate) : null;

  useEffect(() => {
    const id = searchParams.get("property");
    if (id) {
      setPropertyId(id);
    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime(null);
  }, [propertyId]);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate, propertyId]);

  useEffect(() => {
    if (!propertyId || !dateKey || !selectedTime) return;
    if (isSlotBooked(bookings, propertyId, dateKey, selectedTime)) {
      setSelectedTime(null);
    }
  }, [bookings, propertyId, dateKey, selectedTime]);

  useEffect(() => {
    if (!dateKey || !selectedTime || !isValidEmail(form.email)) return;
    if (isUserSlotBooked(bookings, dateKey, selectedTime, form.email)) {
      setFormError("You already have a viewing booked at this time. Choose another slot.");
      setSelectedTime(null);
    }
  }, [bookings, dateKey, selectedTime, form.email]);

  function updateField(field: keyof BookingFormDetails, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError(null);
  }

  const canConfirm =
    Boolean(selectedProperty) &&
    Boolean(dateKey) &&
    Boolean(selectedTime) &&
    form.name.trim().length > 1 &&
    isValidEmail(form.email) &&
    form.phone.trim().length >= 8;

  function handleConfirm(event?: FormEvent) {
    event?.preventDefault();

    if (!selectedProperty || !dateKey || !selectedTime) {
      setFormError("Choose a property, date, and time to continue.");
      return;
    }

    if (!form.name.trim() || !isValidEmail(form.email) || form.phone.trim().length < 8) {
      setFormError("Enter your full name, a valid email, and phone number.");
      return;
    }

    if (isSlotBooked(bookings, selectedProperty.id, dateKey, selectedTime)) {
      setFormError("That time slot was just booked. Please pick another.");
      setSelectedTime(null);
      return;
    }

    if (isUserSlotBooked(bookings, dateKey, selectedTime, form.email)) {
      setFormError("You already have a viewing booked at this time. Choose another slot.");
      setSelectedTime(null);
      return;
    }

    let saved: ViewingBooking;
    try {
      saved = addBooking({
        propertyId: selectedProperty.id,
        propertyTitle: selectedProperty.title,
        propertyLocation: selectedProperty.location,
        date: dateKey,
        time: selectedTime,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        notes: form.notes.trim() || undefined,
      });
    } catch {
      setFormError("That viewing slot is no longer available. Please pick another.");
      setSelectedTime(null);
      return;
    }

    setConfirmedBooking(saved);
    setFormError(null);
    showToast("Your viewing has been booked successfully.");
  }

  function handleReset() {
    setConfirmedBooking(null);
    setPropertyId("");
    setSelectedDate(null);
    setSelectedTime(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  if (confirmedBooking) {
    return (
      <>
        {toast}
        <BookingConfirmation booking={confirmedBooking} onReset={handleReset} />
      </>
    );
  }

  if (!mounted) {
    return <BookingWizardSkeleton />;
  }

  return (
    <>
      {toast}
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start lg:gap-10">
      <div className="space-y-5">
        <section className="booking-step-card">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            1. Choose a property
          </h2>
          <label htmlFor="booking-property" className="contact-label mt-5">
            Property
          </label>
          <select
            id="booking-property"
            value={propertyId}
            onChange={(event) => setPropertyId(event.target.value)}
            className="booking-select"
          >
            <option value="">Select a property…</option>
            {ALL_PROPERTIES.map((property) => (
              <option key={property.id} value={property.id}>
                {property.title} — {property.location}
              </option>
            ))}
          </select>
        </section>

        <BookingCalendar
          propertyId={propertyId}
          selectedDate={selectedDate}
          bookings={bookings}
          onSelectDate={setSelectedDate}
        />

        <BookingTimeSlots
          propertyId={propertyId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          bookings={bookings}
          userEmail={isValidEmail(form.email) ? form.email : undefined}
          onSelectTime={setSelectedTime}
        />

        <section className="booking-step-card">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            4. Your details
          </h2>

          <form className="mt-5 space-y-5" onSubmit={handleConfirm}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-name" className="contact-label">
                  Full name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="contact-field"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="contact-label">
                  Email
                </label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="contact-field"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-phone" className="contact-label">
                Phone
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="contact-field"
                autoComplete="tel"
              />
            </div>

            <div>
              <label htmlFor="booking-notes" className="contact-label">
                Anything we should know? (optional)
              </label>
              <textarea
                id="booking-notes"
                rows={4}
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className="contact-field resize-none"
              />
            </div>

            {formError ? (
              <p className="text-sm font-medium text-bronze" role="alert">
                {formError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canConfirm}
              className="btn-confirm-viewing text-white lg:hidden"
            >
              Confirm viewing
            </button>
          </form>
        </section>
      </div>

      <div className="lg:sticky lg:top-28">
        <BookingSummary
          property={selectedProperty}
          dateKey={dateKey}
          time={selectedTime}
          canConfirm={canConfirm}
          onConfirm={() => handleConfirm()}
        />
      </div>
    </div>
    </>
  );
}
