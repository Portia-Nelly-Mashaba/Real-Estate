"use client";

import { useEffect, useState } from "react";

// only render browser stuff after mount (localStorage, dates, etc.)
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
