"use client";

import { Check, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useHasMounted } from "@/hooks/useHasMounted";

interface NotificationToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  autoHideMs?: number;
}

export function NotificationToast({
  message,
  visible,
  onDismiss,
  autoHideMs = 6000,
}: NotificationToastProps) {
  const mounted = useHasMounted();

  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(onDismiss, autoHideMs);
    return () => window.clearTimeout(timer);
  }, [visible, autoHideMs, onDismiss]);

  if (!visible || !mounted) return null;

  return createPortal(
    <div className="notification-toast" role="status" aria-live="polite">
      <Check className="h-5 w-5 shrink-0 text-gold-light" aria-hidden="true" />
      <p className="flex-1 text-sm font-medium text-hero-text">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="notification-toast-dismiss"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  );
}

export function useNotificationToast(autoHideMs = 6000) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((text: string) => {
    setMessage(text);
  }, []);

  const dismissToast = useCallback(() => {
    setMessage(null);
  }, []);

  const toast = (
    <NotificationToast
      message={message ?? ""}
      visible={Boolean(message)}
      onDismiss={dismissToast}
      autoHideMs={autoHideMs}
    />
  );

  return { showToast, dismissToast, toast };
}
