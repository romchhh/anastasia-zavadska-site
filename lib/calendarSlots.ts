/** Погодинно з API `/api/calendar/slots` (початок слота о HH:00, тривалість 50 хв) */
export const WORKING_HOURS = [9, 10, 11, 14, 15, 16, 17] as const;
export const SLOT_DURATION_MIN = 50;

/** Лейбл у календарі: "15:00–15:50", "16:00–16:50" */
export function formatSlotRangeLabel(hour: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const startTotalMin = hour * 60;
  const endTotalMin = startTotalMin + SLOT_DURATION_MIN;
  const endH = Math.floor(endTotalMin / 60) % 24;
  const endM = endTotalMin % 60;
  return `${pad(hour)}:00–${pad(endH)}:${pad(endM)}`;
}

export const SLOT_LABELS: string[] = WORKING_HOURS.map((h) => formatSlotRangeLabel(h));

/** З діапазону "15:00–15:50" → "15:00" для Google Calendar API */
export function slotRangeToStartTime(slot: string): string | null {
  const m = String(slot).match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return `${m[1].padStart(2, "0")}:${m[2]}`;
}
