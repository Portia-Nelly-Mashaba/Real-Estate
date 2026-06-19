"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BOOKING_HREF, NAV_LINKS, SITE_TAGLINE } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;
  const linkColor = overHero
    ? "text-hero-text/90 hover:text-hero-text"
    : "text-foreground hover:text-foreground";
  const iconColor = overHero ? "text-hero-text" : "text-foreground";

  return (
    <>
      <span
        className={`fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 -rotate-90 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 lg:block ${
          overHero ? "text-hero-text/50" : "text-muted"
        }`}
        aria-hidden="true"
      >
        {SITE_TAGLINE}
      </span>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-glass" : "nav-transparent"
        }`}
      >
        <div className="page-container flex items-center justify-between py-4">
          <Logo scrolled={scrolled} />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={`${href}-${label}`}
                  href={href}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light ${linkColor} ${
                    isActive
                      ? overHero
                        ? "bg-nav-active backdrop-blur-sm"
                        : "bg-nav-active-scrolled text-foreground"
                      : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className={`hidden rounded-full p-2 transition-colors duration-300 hover:bg-nav-active/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light sm:block ${iconColor}`}
              aria-label="Saved properties"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className={iconColor}>
              <ThemeToggle />
            </div>

            <Link
              href={BOOKING_HREF}
              className={`btn-booking hidden px-5 py-2.5 text-sm sm:inline-flex ${
                scrolled ? "btn-booking-black" : "btn-booking-charcoal"
              }`}
            >
              Book a Viewing
            </Link>

            <button
              type="button"
              className={`rounded-md p-2 transition-colors duration-300 lg:hidden ${iconColor}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            className={`border-t lg:hidden ${
              scrolled
                ? "nav-glass border-border/30"
                : "border-hero-text/10 bg-charcoal-hero/95 backdrop-blur-glass"
            }`}
            aria-label="Mobile navigation"
          >
            <div className="page-container py-4">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={`${href}-${label}`}>
                    <Link
                      href={href}
                      className={`block rounded-md px-4 py-3 text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? overHero
                            ? "bg-nav-active text-hero-text"
                            : "bg-nav-active-scrolled text-foreground"
                          : overHero
                            ? "text-hero-text/90 hover:bg-nav-active hover:text-hero-text"
                            : "text-foreground hover:bg-nav-active-scrolled"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link
                  href={BOOKING_HREF}
                  className={`btn-booking w-full ${
                    scrolled ? "btn-booking-black" : "btn-booking-charcoal"
                  }`}
                >
                  Book a Viewing
                </Link>
              </li>
            </ul>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
