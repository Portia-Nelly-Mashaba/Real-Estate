import type { Metadata } from "next";
import { AreasSection } from "@/components/home/AreasSection";
import { Hero } from "@/components/home/Hero";
import { HeroStats } from "@/components/home/HeroStats";
import { CtaSection } from "@/components/home/CTASection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Property South Africa",
  description:
    "Six homes across Cape Town, Johannesburg, Durban, and the Winelands. Book a viewing with Mashaba Property Investments.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="snap-y snap-mandatory">
        <Hero />
        <section className="snap-start bg-charcoal py-5 sm:py-6">
          <div className="page-container">
            <HeroStats />
          </div>
        </section>
        <AreasSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
