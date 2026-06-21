import { ServiceCard } from "@/components/about/ServiceCard";
import { ServicesMobileCarousel } from "@/components/about/ServicesMobileCarousel";
import {
  ABOUT_SERVICES,
  SERVICE_OFFERINGS,
} from "@/lib/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-28 border-t border-border/30 bg-white py-14 sm:py-16"
    >
      <div className="page-container">
        <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
          {ABOUT_SERVICES.label}
        </p>
        <h2 className="mt-2 font-serif text-[1.75rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2rem] lg:text-[2.25rem]">
          {ABOUT_SERVICES.title}
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">
          {ABOUT_SERVICES.description}
        </p>

        <ServicesMobileCarousel offerings={SERVICE_OFFERINGS} />

        <ul className="mt-10 hidden grid-cols-1 gap-5 lg:grid lg:grid-cols-2 lg:gap-6">
          {SERVICE_OFFERINGS.map((offering) => (
            <li key={offering.id} className="flex">
              <ServiceCard offering={offering} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
