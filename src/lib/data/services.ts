import { BOOKING_HREF } from "@/lib/constants";

export const ABOUT_SERVICES = {
  label: "What We Offer",
  title: "Our services",
  description:
    "Viewings, valuations, and buyer help. We do not list every home on the market — just the ones we can stand behind.",
} as const;

export type ServiceIconId =
  | "key-round"
  | "chart-line"
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
      "Book a walkthrough at a time that suits you. Mon–Sat slots, Sandton office for paperwork if needed.",
    href: BOOKING_HREF,
    cta: "Book a viewing",
  },
  {
    id: "valuation",
    iconId: "chart-line",
    title: "Property valuation",
    description:
      "Market appraisals for sellers and buyers, based on recent sales in the suburb.",
    href: "/contact",
    cta: "Request a valuation",
  },
  {
    id: "buyer",
    iconId: "search",
    title: "Buyer representation",
    description:
      "We shortlist homes, sit in on negotiations, and chase the conveyancer until registration.",
    href: "/gallery",
    cta: "Browse properties",
  },
  {
    id: "off-market",
    iconId: "home",
    title: "Off-market listings",
    description:
      "Some sellers prefer not to go on the big portals. Ask us what is available quietly.",
    href: "/contact",
    cta: "Enquire privately",
  },
];
