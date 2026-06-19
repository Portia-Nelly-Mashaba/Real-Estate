import { BOOKING_HREF } from "@/lib/constants";

export const FOOTER_DESCRIPTION =
  "South Africa's premier luxury real estate agency. Curating exceptional properties for discerning buyers since 2024.";

export const FOOTER_EXPLORE_LINKS = [
  { href: "/gallery", label: "Properties" },
  { href: "/services", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { href: BOOKING_HREF, label: "Book a Viewing" },
  { href: "/contact", label: "Property Valuation" },
  { href: "/services", label: "Investment Advisory" },
  { href: "/contact", label: "Relocation Services" },
] as const;

export const FOOTER_CONTACT = {
  address: "136 White Road, Deinfern, Sandton, 2001",
  phone: "011 261 6234",
  phoneHref: "tel:+27112616234",
  email: "hello@mashabaproperty.co.za",
  emailHref: "mailto:hello@mashabaproperty.co.za",
} as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;
