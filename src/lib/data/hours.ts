/** Office and viewing hours — single source of truth */
export const OPERATING_HOURS = {
  timezone: "SAST",
  weekday: { label: "Mon - Fri", open: "09:00", close: "17:00" },
  saturday: { label: "Sat", open: "09:00", close: "17:00" },
  closedDays: ["Sun"] as const,
} as const;

export const OPERATING_HOURS_LINES = [
  `${OPERATING_HOURS.weekday.label}: ${OPERATING_HOURS.weekday.open} - ${OPERATING_HOURS.weekday.close}`,
  `${OPERATING_HOURS.saturday.label}: ${OPERATING_HOURS.saturday.open} - ${OPERATING_HOURS.saturday.close}`,
] as const;

export const VIEWING_HOURS_LABEL = `Mon–Sat, ${OPERATING_HOURS.weekday.open}–${OPERATING_HOURS.weekday.close} ${OPERATING_HOURS.timezone}`;

export const VIEWING_HOURS_DESCRIPTION = `Choose a date and time, and we'll arrange the rest. Viewings run ${VIEWING_HOURS_LABEL}.`;
