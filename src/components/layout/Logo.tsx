import Link from "next/link";
import { SITE_LOGO_ACCENT, SITE_LOGO_PRIMARY, SITE_NAME } from "@/lib/constants";

interface LogoProps {
  overHero: boolean;
}

export function Logo({ overHero }: LogoProps) {
  return (
    <Link
      href="/"
      className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
      aria-label={SITE_NAME}
    >
      <span className="font-serif text-[1.35rem] font-medium leading-none tracking-tight sm:text-[1.5rem]">
        <span
          className={`transition-colors duration-300 ${
            overHero ? "text-hero-text" : "text-foreground"
          }`}
        >
          {SITE_LOGO_PRIMARY}
        </span>
        <span className="text-bronze transition-colors duration-300">
          {SITE_LOGO_ACCENT}
        </span>
      </span>
    </Link>
  );
}
