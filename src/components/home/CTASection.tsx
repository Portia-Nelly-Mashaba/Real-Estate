import Image from "next/image";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="relative flex min-h-[26rem] items-center justify-center overflow-hidden sm:min-h-[30rem] lg:min-h-[32rem]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80"
          alt="Luxury apartment living room with city views at dusk"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="hero-dim pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      <div className="page-container relative z-10 py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-hero-text sm:text-4xl lg:text-[2.75rem]">
          Walk through it properly.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-hero-text/80 sm:text-lg">
          Private viewings across South Africa — Cape Town, Johannesburg,
          Durban, and the Winelands. Your pace, your questions.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Link href="/gallery" className="btn-hero-browse">
            View properties
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href={BOOKING_HREF} className="btn-hero-glass">
            Book a viewing
          </Link>
        </div>
      </div>
    </section>
  );
}
