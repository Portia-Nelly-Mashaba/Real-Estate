import { FOOTER_CONTACT } from "@/lib/data/footer";
import { OPERATING_HOURS_LINES } from "@/lib/data/hours";

export const CONTACT_PAGE = {
  label: "Get in Touch",
  lead: "A single conversation.",
  description:
    "Want to view a home, list privately, or ask about a suburb? Call, email, or use the form.",
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
    lines: [...OPERATING_HOURS_LINES],
  },
] as const;
