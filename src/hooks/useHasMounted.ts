"use client";

import { useEffect, useState } from "react";

/** Avoid SSR/client mismatches for browser-only UI (dates, localStorage, extensions). */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
