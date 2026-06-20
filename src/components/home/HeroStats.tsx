import { HERO_STATS } from "@/lib/data/stats";
import { HeroStatsMarquee } from "@/components/home/HeroStatsMarquee";

export function HeroStats() {
  return (
    <>
      <HeroStatsMarquee />

      <dl className="hidden grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid sm:grid-cols-4 sm:gap-x-8">
        {HERO_STATS.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse items-center">
            <dt className="mt-2 font-sans text-sm text-hero-text/55 sm:text-[0.9375rem]">
              {label}
            </dt>
            <dd className="font-serif text-3xl text-hero-text sm:text-4xl lg:text-[2.75rem] lg:leading-none">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
