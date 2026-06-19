import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import {
  FOOTER_CONTACT,
  FOOTER_DESCRIPTION,
  FOOTER_EXPLORE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SERVICE_LINKS,
} from "@/lib/data/footer";
import {
  SITE_LOGO_ACCENT,
  SITE_LOGO_PRIMARY,
  SITE_NAME,
} from "@/lib/constants";

const footerLinkClass =
  "text-sm text-[#d1d1d1]/80 transition-colors duration-200 hover:text-[#d1d1d1]";

const footerHeadingClass =
  "text-[0.6875rem] font-display font-semibold uppercase tracking-[0.18em] text-[#888888]";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1a1a1a] text-[#d1d1d1]">
      <div
        className="pointer-events-none absolute inset-x-0 top-[42%] z-0 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="page-container flex justify-center">
          <span className="select-none whitespace-nowrap font-serif text-[clamp(2.5rem,10vw,8.5rem)] font-medium leading-none tracking-tight text-[#888888]/[0.07]">
            {SITE_LOGO_PRIMARY} {SITE_LOGO_ACCENT}
          </span>
        </div>
      </div>

      <div className="page-container relative z-[1] py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Link
              href="/"
              className="inline-block font-serif text-[1.35rem] font-medium leading-none tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
              aria-label={SITE_NAME}
            >
              <span className="text-white">{SITE_LOGO_PRIMARY}</span>
              <span className="text-bronze">{SITE_LOGO_ACCENT}</span>
            </Link>
            <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-[#d1d1d1]/70">
              {FOOTER_DESCRIPTION}
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className={footerHeadingClass}>Explore</h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={footerHeadingClass}>Services</h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={footerHeadingClass}>Contact</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#d1d1d1]/70"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <address className="not-italic text-sm leading-relaxed text-[#d1d1d1]/80">
                  {FOOTER_CONTACT.address}
                </address>
              </li>
              <li>
                <a
                  href={FOOTER_CONTACT.phoneHref}
                  className={`inline-flex items-center gap-3 ${footerLinkClass}`}
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-[#d1d1d1]/70"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {FOOTER_CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={FOOTER_CONTACT.emailHref}
                  className={`inline-flex items-center gap-3 ${footerLinkClass}`}
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-[#d1d1d1]/70"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {FOOTER_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="page-container flex flex-col gap-3 py-5 text-xs text-[#888888] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#d1d1d1]/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
