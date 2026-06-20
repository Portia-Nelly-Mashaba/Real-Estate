import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Mashaba Property Investments",
  description: "How Mashaba Property Investments handles your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-brown-light">
        <section className="page-container pb-16 pt-28 sm:pb-20 sm:pt-32">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
            Legal
          </p>
          <h1 className="mt-2 max-w-xl font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
            Privacy policy
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            <p>
              We collect only the information you provide when contacting us,
              booking a viewing, or subscribing to updates. This may include
              your name, email address, phone number, and property preferences.
            </p>
            <p>
              We use this information to respond to enquiries, arrange viewings,
              and improve our service. We do not sell your personal data to third
              parties.
            </p>
            <p>
              For questions about your data, please{" "}
              <Link
                href="/contact"
                className="font-medium text-accent transition-colors hover:text-accent-hover"
              >
                contact us
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
