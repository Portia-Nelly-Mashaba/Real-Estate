import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-charcoal-hero">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-charcoal-deep/80 via-charcoal-hero to-charcoal-deep"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-40">
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

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/gallery" className="btn-primary">
            Browse Collection
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-hero-text/25 bg-hero-text/10 px-6 py-3 text-sm font-semibold text-hero-text backdrop-blur-sm transition-colors hover:bg-hero-text/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            Book a Private Viewing
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-hero-text/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-gold-light" />
        </div>
      </div>
    </section>
  );
}
