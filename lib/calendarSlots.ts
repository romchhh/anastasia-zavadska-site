/** Погодинно з API `/api/calendar/slots` (початок слота, тривалість 60 хв) */
export const WORKING_HOURS = [9, 10, 11, 14, 15, 16, 17] as const;
export const SLOT_DURATION_MIN = 60;

/** Лейбл як у календарі: "09:00–10:00" */
export function formatSlotRangeLabel(hour: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hour)}:00–${pad(hour + 1)}:00`;
}

export const SLOT_LABELS: string[] = WORKING_HOURS.map((h) => formatSlotRangeLabel(h));

/** З діапазону "09:00–10:00" → "09:00" для Google Calendar API */
export function slotRangeToStartTime(slot: string): string | null {
  const m = String(slot).match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return `${m[1].padStart(2, "0")}:${m[2]}`;
}
