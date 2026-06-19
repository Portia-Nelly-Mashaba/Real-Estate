import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_DETAILS } from "@/lib/data/contact";

const iconMap = {
  visit: MapPin,
  call: Phone,
  email: Mail,
  hours: Clock,
} as const;

export function ContactInfo() {
  return (
    <ul className="space-y-8">
      {CONTACT_DETAILS.map((item) => {
        const Icon = iconMap[item.id];
        const content = (
          <>
            <h2 className="font-display text-sm font-semibold text-foreground">
              {item.title}
            </h2>
            <div className="mt-1 space-y-0.5">
              {item.lines.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-muted">
                  {line}
                </p>
              ))}
            </div>
          </>
        );

        return (
          <li key={item.id} className="flex gap-4">
            <div className="contact-info-icon">
              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  className="group block transition-colors hover:text-accent"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
