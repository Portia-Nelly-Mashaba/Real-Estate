import type { LucideIcon } from "lucide-react";
import { KeyRound, MapPin, ShieldCheck, Sparkles } from "lucide-react";

export interface WhyUsPoint {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_US_POINTS: WhyUsPoint[] = [
  {
    id: "private",
    icon: ShieldCheck,
    title: "Private by habit",
    description:
      "Off-market homes and viewings that stay between us.",
  },
  {
    id: "curated",
    icon: Sparkles,
    title: "Picked, not piled up",
    description:
      "Every property is checked before it goes live.",
  },
  {
    id: "local",
    icon: MapPin,
    title: "Local first",
    description:
      "Camps Bay to Sandton, Umhlanga to Stellenbosch — we know the ground.",
  },
  {
    id: "concierge",
    icon: KeyRound,
    title: "Help after the handover",
    description:
      "Bonds, lawyers, movers — one team from offer to keys.",
  },
];
