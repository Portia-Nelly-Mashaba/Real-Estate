import { ALL_PROPERTIES } from "@/lib/data/properties";

function formatPortfolioValue(): string {
  const total = ALL_PROPERTIES.reduce((sum, property) => sum + property.price, 0);

  if (total >= 1_000_000_000) {
    return `R ${(total / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B+`;
  }

  return `R ${Math.round(total / 1_000_000)}M+`;
}

export const HERO_STATS = [
  { value: String(ALL_PROPERTIES.length), label: "Homes Listed" },
  { value: formatPortfolioValue(), label: "Portfolio Value" },
  { value: "4", label: "Regions Covered" },
  { value: "2024", label: "Established" },
] as const;
