"use client";

import Link from "next/link";
import {
  Building2,
  ChartLine,
  Home,
  KeyRound,
  MapPinned,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconId, ServiceOffering } from "@/lib/data/services";

const SERVICE_ICONS: Record<ServiceIconId, LucideIcon> = {
  "key-round": KeyRound,
  "chart-line": ChartLine,
  building: Building2,
  "map-pinned": MapPinned,
  search: Search,
  home: Home,
};

interface ServiceCardProps {
  offering: ServiceOffering;
}

export function ServiceCard({ offering }: ServiceCardProps) {
  const { iconId, title, description, href, cta } = offering;
  const Icon = SERVICE_ICONS[iconId];

  return (
    <article className="why-us-card h-full w-full">
      <div className="flex items-center gap-3">
        <Icon
          className="h-5 w-5 shrink-0 text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
          {title}
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-1 pt-5 font-display text-sm font-bold text-foreground transition-colors hover:text-accent"
      >
        {cta}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </article>
  );
}
