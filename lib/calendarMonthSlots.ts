import { DateTime } from "luxon";
import { WORKING_HOURS, SLOT_DURATION_MIN } from "@/lib/calendarSlots";
import { getCalendarApi, getCalendarId } from "@/lib/googleCalendarServer";
import { KYIV_TZ } from "@/lib/kyivDate";

/**
 * Усі дні календарного місяця (Kyiv) зі слотами робочих годин.
 * Один виклик Google Calendar events.list на весь місяць.
 */
export async function buildMonthSlotsData(monthYm: string): Promise<
  Record<string, { time: string; available: boolean }[]>
> {
  const dt = DateTime.fromISO(`${monthYm}-01`, { zone: KYIV_TZ });
  if (!dt.isValid) {
    throw new Error("Invalid month");
  }

  const monthStart = dt.startOf("month");
  const monthEndExclusive = monthStart.plus({ months: 1 });

  const calendar = getCalendarApi();
  const calendarId = getCalendarId();

  const res = await calendar.events.list({
    calendarId,
    timeMin: monthStart.toISO()!,
    timeMax: monthEndExclusive.toISO()!,
    singleEvents: true,
    orderBy: "startTime",
  });

  const busyIntervals = (res.data.items ?? []).map((e) => ({
    start: new Date(e.start?.dateTime ?? e.start?.date ?? ""),
    end: new Date(e.end?.dateTime ?? e.end?.date ?? ""),
  }));

  const slots: Record<string, { time: string; available: boolean }[]> = {};
  const daysInMonth = monthStart.daysInMonth ?? 31;

  for (let i = 0; i < daysInMonth; i++) {
    const day = monthStart.plus({ days: i });
    const key = day.toFormat("yyyy-MM-dd");
    slots[key] = [];

    for (const hour of WORKING_HOURS) {
      const slotStart = day.set({
        hour,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      const slotEnd = slotStart.plus({ minutes: SLOT_DURATION_MIN });

      const isBusy = busyIntervals.some(
        (b) => slotStart.toJSDate() < b.end && slotEnd.toJSDate() > b.start
      );

      slots[key].push({
        time: `${String(hour).padStart(2, "0")}:00`,
        available: !isBusy,
      });
    }
  }

  return slots;
}
