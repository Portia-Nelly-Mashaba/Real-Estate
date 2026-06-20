import { TESTIMONIALS } from "@/lib/data/testimonials";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { TestimonialsMobileCarousel } from "@/components/home/TestimonialsMobileCarousel";

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

        <TestimonialsMobileCarousel testimonials={TESTIMONIALS} />

        <ul className="mt-10 hidden gap-6 lg:mt-12 lg:grid lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.id} className="flex">
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
