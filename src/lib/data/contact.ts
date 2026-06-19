import { FOOTER_CONTACT } from "@/lib/data/footer";

export const CONTACT_PAGE = {
  label: "Get in Touch",
  lead: "A single conversation.",
  description:
    "Whether you'd like to view a home, list one privately, or simply understand the market — we'd be glad to talk.",
} as const;

export const CONTACT_DETAILS = [
  {
    id: "visit",
    title: "Visit Us",
    lines: [FOOTER_CONTACT.address],
  },
  {
    id: "call",
    title: "Call Us",
    lines: [FOOTER_CONTACT.phone],
    href: FOOTER_CONTACT.phoneHref,
  },
  {
    id: "email",
    title: "Email Us",
    lines: [FOOTER_CONTACT.email],
    href: FOOTER_CONTACT.emailHref,
  },
  {
    id: "hours",
    title: "Business Hours",
    lines: ["Mon - Fri: 09:00 - 17:00", "Sat: 09:00 - 13:00"],
  },
] as const;
