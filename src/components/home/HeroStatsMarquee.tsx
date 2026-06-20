import { HERO_STATS } from "@/lib/data/stats";

function MarqueeContent() {
  return (
    <>
      {HERO_STATS.map((stat) => (
        <span key={stat.label} className="hero-stats-marquee-item">
          <span className="hero-stats-marquee-star" aria-hidden="true">
            ★
          </span>
          <span className="hero-stats-marquee-value">{stat.value}</span>
          <span className="hero-stats-marquee-label">{stat.label}</span>
        </span>
      ))}
    </>
  );
}

export function HeroStatsMarquee() {
  return (
    <div
      className="hero-stats-marquee sm:hidden"
      aria-label="Company highlights"
    >
      <div className="hero-stats-marquee-track">
        <div className="hero-stats-marquee-group" aria-hidden="true">
          <MarqueeContent />
        </div>
        <div className="hero-stats-marquee-group" aria-hidden="true">
          <MarqueeContent />
        </div>
      </div>

      <ul className="sr-only">
        {HERO_STATS.map((stat) => (
          <li key={stat.label}>
            {stat.value} {stat.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
