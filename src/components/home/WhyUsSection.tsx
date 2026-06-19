import { WHY_US_POINTS } from "@/lib/data/why-us";

export function WhyUsSection() {
  return (
    <section className="border-y border-foreground/15 bg-why-section-bg py-16 sm:py-20 lg:py-24">
      <div className="page-container">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <div className="max-w-md lg:max-w-lg">
            <p className="text-label font-display font-medium uppercase tracking-[0.15em] text-accent">
              Why Mashaba
            </p>
            <h2 className="mt-3 font-serif text-[2rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.25rem] lg:text-[2.5rem]">
              Homes worth showing. People worth knowing.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              We do not chase every listing on the market. We work with a small
              set of properties and give each one — and each buyer — proper
              time. Less noise, clearer prices, better results.
            </p>
          </div>

          <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch sm:gap-5">
            {WHY_US_POINTS.map(({ id, icon: Icon, title, description }) => (
              <li key={id} className="flex min-h-0">
                <article className="why-us-card">
                  <Icon
                    className="h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
