export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "camps-bay",
    quote:
      "We saw three homes in one weekend. No pressure, no rush. They knew what we wanted before we said it.",
    name: "Thabo & Lerato M.",
    location: "Camps Bay",
  },
  {
    id: "sandton",
    quote:
      "Sold our apartment in five weeks. Straight talk on price — not what we hoped to hear, but what we needed to hear.",
    name: "David K.",
    location: "Sandton",
  },
  {
    id: "umhlanga",
    quote:
      "First home in Durban. One team handled the bond, the lawyer, and the handover. We never felt lost.",
    name: "Priya & James N.",
    location: "Umhlanga",
  },
];
