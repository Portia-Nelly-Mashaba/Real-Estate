import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
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
  );
}
