import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ServicesSection } from "@/components/about/ServicesSection";
import { BOOKING_HREF } from "@/lib/constants";
import {
  ABOUT_AREAS,
  ABOUT_FACTS,
  ABOUT_PAGE,
  ABOUT_TEAM,
  FOOTER_CONTACT,
} from "@/lib/data/about";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description: ABOUT_PAGE.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-brown-light">
        <section className="page-container pb-16 pt-28 sm:pb-20 sm:pt-32">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
            {ABOUT_PAGE.label}
          </p>
          <h1 className="mt-2 max-w-xl font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
            {ABOUT_PAGE.lead}
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">
            {ABOUT_PAGE.description}
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/40 shadow-[0_8px_32px_rgba(26,26,26,0.08)]">
              <Image
                src={ABOUT_PAGE.image}
                alt={ABOUT_PAGE.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <p className="absolute bottom-4 left-4 rounded-full bg-charcoal-deep/80 px-3 py-1.5 text-xs font-medium text-hero-text backdrop-blur-sm">
                {ABOUT_PAGE.imageCaption}
              </p>
            </div>

            <div>
              <p className="text-base leading-relaxed text-muted sm:text-[1.0625rem]">
                {ABOUT_PAGE.story}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-border/30 py-6">
                {ABOUT_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-label font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-serif text-lg font-medium text-foreground">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-2xl border border-border/50 bg-white px-6 py-5 shadow-[0_4px_20px_rgba(26,26,26,0.06)]">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-brown-light font-display text-sm font-bold text-accent"
                    aria-hidden="true"
                  >
                    {ABOUT_TEAM.initials}
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {ABOUT_TEAM.name}
                    </p>
                    <p className="text-sm text-gold-light">{ABOUT_TEAM.role}</p>
                    <p className="mt-2 text-sm text-muted">{ABOUT_TEAM.bio}</p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm text-muted">
                <span className="font-medium text-foreground">Areas we cover:</span>{" "}
                {ABOUT_AREAS.map((area, index) => (
                  <span key={area.name}>
                    {index > 0 ? " · " : ""}
                    <Link
                      href={area.href}
                      className="text-accent transition-colors hover:text-accent-hover"
                    >
                      {area.name}
                    </Link>
                  </span>
                ))}
              </p>

              <p className="mt-6 text-sm text-muted">
                {FOOTER_CONTACT.address}
                <br />
                <a
                  href={FOOTER_CONTACT.phoneHref}
                  className="text-accent transition-colors hover:text-accent-hover"
                >
                  {FOOTER_CONTACT.phone}
                </a>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-hero-browse">
                  Contact us
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href={BOOKING_HREF} className="btn-hero-glass">
                  Book a viewing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
      </main>
      <div className="gallery-footer-shade" aria-hidden="true" />
      <Footer />
    </>
  );
}
