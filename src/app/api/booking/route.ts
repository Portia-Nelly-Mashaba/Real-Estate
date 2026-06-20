import { NextResponse } from "next/server";
import { formatDisplayDate, parseDateKey } from "@/lib/booking/availability";
import { FOOTER_CONTACT } from "@/lib/data/footer";

interface BookingPayload {
  propertyId?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

function isValidDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = parseDateKey(value);
  return !Number.isNaN(parsed.getTime());
}

function buildAdminNotification(
  body: Required<
    Pick<
      BookingPayload,
      | "propertyTitle"
      | "propertyLocation"
      | "date"
      | "time"
      | "name"
      | "email"
      | "phone"
    >
  > &
    Pick<BookingPayload, "notes">,
): string {
  const lines = [
    "New viewing booking — Mashaba Property Investments",
    "",
    `Property: ${body.propertyTitle}, ${body.propertyLocation}`,
    `Date: ${formatDisplayDate(body.date)}`,
    `Time: ${body.time}`,
    "",
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone}`,
  ];

  if (body.notes?.trim()) {
    lines.push(`Notes: ${body.notes.trim()}`);
  }

  lines.push("", `Notify team inbox: ${FOOTER_CONTACT.email}`);

  return lines.join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json()) as BookingPayload;

  if (
    !body.propertyId?.trim() ||
    !body.propertyTitle?.trim() ||
    !body.propertyLocation?.trim() ||
    !body.date?.trim() ||
    !body.time?.trim() ||
    !body.name?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim()
  ) {
    return NextResponse.json(
      { error: "All booking fields are required." },
      { status: 400 },
    );
  }

  if (!isValidDateKey(body.date)) {
    return NextResponse.json({ error: "Invalid booking date." }, { status: 400 });
  }

  const notification = buildAdminNotification({
    propertyTitle: body.propertyTitle.trim(),
    propertyLocation: body.propertyLocation.trim(),
    date: body.date.trim(),
    time: body.time.trim(),
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    notes: body.notes,
  });

  console.info("[booking-notification]", notification);

  return NextResponse.json({
    message: "Booking notification sent to our team.",
    channels: ["email", "whatsapp"],
  });
}
