import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroTagline } from "@/components/home/HeroTagline";

export function Hero() {
  return (
    <section className="relative flex h-dvh snap-start snap-always flex-col justify-center overflow-hidden bg-charcoal-hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Modern white luxury home with green lawn and open blue sky"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dim overlay */}
      <div className="hero-dim pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      {/* Gradient depth on top of dim */}
      <div
        className="hero-dim-gradient pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
      />

      <HeroTagline />

      <div className="page-container relative z-10 overflow-visible pb-16 pt-32 lg:pb-20 lg:pt-40">
        <p className="section-label text-gold-light">Premium Real Estate</p>

        <h1 className="mt-4 max-w-3xl font-serif text-display-lg text-hero-text sm:text-display-xl">
          Find Your{" "}
          <em className="text-gold-light">Extraordinary</em> Home
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-hero-text/80">
          Mashaba Property Investments connects discerning buyers with
          exceptional properties across South Africa. Browse listings, book
          viewings, and invest with confidence.
        </p>

        <HeroSearch />

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/gallery" className="btn-hero-browse">
            Browse Collection
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href="/booking" className="btn-hero-glass">
            Book a Private Viewing
          </Link>
        </div>
      </div>
    </section>
  );
}
