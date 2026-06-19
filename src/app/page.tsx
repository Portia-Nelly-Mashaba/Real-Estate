import { AreasSection } from "@/components/home/AreasSection";
import { Hero } from "@/components/home/Hero";
import { HeroStats } from "@/components/home/HeroStats";
import { CtaSection } from "@/components/home/CTASection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="snap-y snap-mandatory">
        <Hero />
        <section className="snap-start bg-charcoal py-10 sm:py-12">
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
