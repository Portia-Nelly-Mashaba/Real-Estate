import { formatDisplayDate } from "@/lib/booking/availability";
import type { PropertyListing } from "@/lib/data/properties";

interface BookingSummaryProps {
  property: PropertyListing | null;
  dateKey: string | null;
  time: string | null;
  canConfirm: boolean;
  onConfirm: () => void;
}

export function BookingSummary({
  property,
  dateKey,
  time,
  canConfirm,
  onConfirm,
}: BookingSummaryProps) {
  return (
    <aside className="booking-summary-card">
      <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-gold-light">
        Summary
      </p>
      <h2 className="mt-2 font-serif text-2xl font-medium text-hero-text">
        Your viewing
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-start justify-between gap-4 border-b border-hero-text/10 pb-4">
          <dt className="text-sm text-hero-text/70">Property</dt>
          <dd className="text-right text-sm font-medium text-hero-text">
            {property ? (
              <>
                {property.title}
                <span className="mt-0.5 block text-xs font-normal text-hero-text/70">
                  {property.location}
                </span>
              </>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-hero-text/10 pb-4">
          <dt className="text-sm text-hero-text/70">Date</dt>
          <dd className="text-right text-sm font-medium text-hero-text">
            {dateKey ? formatDisplayDate(dateKey) : "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-hero-text/70">Time</dt>
          <dd className="text-right text-sm font-medium text-hero-text">
            {time ?? "—"}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onConfirm}
        disabled={!canConfirm}
        className="btn-confirm-viewing mt-8 text-white"
      >
        Confirm viewing
      </button>
    </aside>
  );
}
