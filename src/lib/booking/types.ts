export interface ViewingBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
}

export interface BookingFormDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type CalendarDayState = "empty" | "unavailable" | "available" | "selected";
