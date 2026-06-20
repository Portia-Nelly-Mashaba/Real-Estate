"use client";

import { useCallback, useEffect, useState } from "react";
import { BOOKINGS_UPDATED_EVENT } from "@/lib/booking/config";
import { getBookings, saveBooking } from "@/lib/booking/storage";
import type { ViewingBooking } from "@/lib/booking/types";

export function useBookings() {
  const [bookings, setBookings] = useState<ViewingBooking[]>([]);

  const refresh = useCallback(() => {
    setBookings(getBookings());
  }, []);

  useEffect(() => {
    refresh();

    function handleUpdate() {
      refresh();
    }

    window.addEventListener(BOOKINGS_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(BOOKINGS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  const addBooking = useCallback(
    (booking: Omit<ViewingBooking, "id" | "createdAt">) => {
      const saved = saveBooking(booking);
      refresh();
      return saved;
    },
    [refresh],
  );

  return { bookings, addBooking, refresh };
}
