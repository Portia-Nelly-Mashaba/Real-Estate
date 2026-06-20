import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BOOKING_PAGE } from "@/lib/booking/config";

export const metadata: Metadata = {
  title: "Book a Viewing | Mashaba Property Investments",
  description: BOOKING_PAGE.description,
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="bg-brown-light">
        <section className="page-container pb-16 pt-28 sm:pb-20 sm:pt-32">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
            {BOOKING_PAGE.label}
          </p>
          <h1 className="mt-2 max-w-xl font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
            {BOOKING_PAGE.lead}
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">
            {BOOKING_PAGE.description}
          </p>

          <div className="mt-10">
            <Suspense fallback={null}>
              <BookingWizard />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
