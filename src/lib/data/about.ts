import { FOOTER_CONTACT } from "@/lib/data/footer";

export const ABOUT_PAGE = {
  label: "About Us",
  lead: "A small agency. A short list.",
  description:
    "Mashaba Property Investments opened in Sandton in 2024. We work across Cape Town, Johannesburg, Durban, and the Winelands.",
  story:
    "Our office is on White Road in Deinfern. We take on fewer homes than the big portals and give each buyer and seller proper time — viewings by appointment, one team from offer to registration.",
  image: "/images/about/de-infern-sandton.jpg",
  imageAlt: "Sandton skyline near Deinfern, Johannesburg",
  imageCaption: "Deinfern, Sandton",
} as const;

export const ABOUT_FACTS = [
  { label: "Established", value: "2024" },
  { label: "Office", value: "Sandton" },
  { label: "Regions", value: "WC · GP · KZN" },
] as const;

export const ABOUT_AREAS = [
  { name: "Cape Town", href: "/gallery?location=cape-town" },
  { name: "Sandton", href: "/gallery?location=sandton" },
  { name: "Umhlanga", href: "/gallery?location=umhlanga" },
  { name: "Stellenbosch", href: "/gallery?location=stellenbosch" },
] as const;

export const ABOUT_TEAM = {
  name: "Portia Mashaba",
  role: "Principal Agent",
  bio: "Runs the Sandton office and coordinates viewings across our markets.",
  initials: "PM",
} as const;

export { FOOTER_CONTACT };
