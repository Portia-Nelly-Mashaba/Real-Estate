import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-charcoal-hero py-16 sm:py-20 lg:py-24">
      <div className="page-container">
        <div className="max-w-2xl">
          <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-gold-light">
            Clients
          </p>
          <h2 className="mt-3 font-serif text-[2rem] font-medium leading-tight tracking-tight text-hero-text sm:text-[2.25rem] lg:text-[2.5rem]">
            Trusted by the people we serve.
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.id} className="flex">
              <article className="testimonial-card">
                <Quote
                  className="h-7 w-7 shrink-0 text-gold-light"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-hero-text/95">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 shrink-0 text-sm text-hero-text/80">
                  <span>{testimonial.name}</span>
                  <span className="text-hero-text/40"> · </span>
                  <span className="text-gold-light">{testimonial.location}</span>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
