import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Terms of Service | Mashaba Property Investments",
  description: "Terms of service for Mashaba Property Investments.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-brown-light">
        <section className="page-container pb-16 pt-28 sm:pb-20 sm:pt-32">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
            Legal
          </p>
          <h1 className="mt-2 max-w-xl font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
            Terms of service
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            <p>
              Property listings, prices, and availability on this website are
              subject to change without notice. Viewings and offers are subject
              to confirmation by our team and applicable South African property
              regulations.
            </p>
            <p>
              By using this site you agree not to misuse our content, booking
              system, or contact forms. Provisional viewing bookings do not
              constitute a sale or lease agreement.
            </p>
            <p>
              Questions about these terms?{" "}
              <Link
                href="/contact"
                className="font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
