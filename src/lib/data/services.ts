import { BOOKING_HREF } from "@/lib/constants";

export const ABOUT_SERVICES = {
  label: "What We Offer",
  title: "Our services",
  description:
    "Beyond listings — valuations, advisory, and end-to-end support for luxury buyers across South Africa.",
} as const;

export type ServiceIconId =
  | "key-round"
  | "chart-line"
  | "building"
  | "map-pinned"
  | "search"
  | "home";

export interface ServiceOffering {
  id: string;
  iconId: ServiceIconId;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: "viewings",
    iconId: "key-round",
    title: "Private viewings",
    description:
      "Book a one-on-one walkthrough at a time that suits you. Weekday and Saturday slots available.",
    href: BOOKING_HREF,
    cta: "Book a viewing",
  },
  {
    id: "valuation",
    iconId: "chart-line",
    title: "Property valuation",
    description:
      "Accurate market appraisals for sellers, buyers, and investors — backed by local comparables.",
    href: "/contact",
    cta: "Request a valuation",
  },
  {
    id: "advisory",
    iconId: "building",
    title: "Investment advisory",
    description:
      "Portfolio guidance for local and offshore buyers looking at high-yield luxury assets.",
    href: "/contact",
    cta: "Speak to an advisor",
  },
  {
    id: "relocation",
    iconId: "map-pinned",
    title: "Relocation services",
    description:
      "Area orientation, school districts, and move coordination for families relocating to SA.",
    href: "/contact",
    cta: "Plan your move",
  },
  {
    id: "buyer",
    iconId: "search",
    title: "Buyer representation",
    description:
      "We shortlist, negotiate, and manage due diligence so you buy with confidence.",
    href: "/gallery",
    cta: "Browse properties",
  },
  {
    id: "off-market",
    iconId: "home",
    title: "Off-market listings",
    description:
      "Access homes not advertised on public portals — discreet sales for discerning sellers.",
    href: "/contact",
    cta: "Enquire privately",
  },
];
