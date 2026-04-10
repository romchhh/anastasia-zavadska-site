import { google } from "googleapis";
import { DateTime } from "luxon";
import { SLOT_DURATION_MIN } from "@/lib/calendarSlots";
import { KYIV_TZ } from "@/lib/kyivDate";

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID
  );
}

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL!,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export function getCalendarApi() {
  const auth = getAuth();
  return google.calendar({ version: "v3", auth });
}

export function getCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID!;
}

export type InsertConsultationParams = {
  date: string;
  time: string;
  name: string;
  phone?: string;
  consultationType?: string;
  social?: string;
  /** Короткий опис / контекст з форми */
  description?: string;
};

/**
 * Створює подію в Google Calendar (Kyiv). Перевіряє колізію в інтервалі.
 */
export async function insertConsultationEvent(
  params: InsertConsultationParams
): Promise<{ eventId: string | null | undefined }> {
  const { date, time, name, phone, consultationType, social, description } = params;

  const start = DateTime.fromISO(`${date}T${time}`, { zone: KYIV_TZ });
  if (!start.isValid) {
    throw new Error("Invalid date or time");
  }
  const end = start.plus({ minutes: SLOT_DURATION_MIN });

  const calendar = getCalendarApi();
  const calendarId = getCalendarId();

  const existing = await calendar.events.list({
    calendarId,
    timeMin: start.toISO()!,
    timeMax: end.toISO()!,
    singleEvents: true,
  });

  if ((existing.data.items ?? []).length > 0) {
    const err = new Error("Slot already booked");
    (err as Error & { statusCode?: number }).statusCode = 409;
    throw err;
  }

  const socialLine = social?.trim();
  const descLine = description?.trim();

  const descriptionLines = [
    `Тип: ${consultationType ?? "individual"}`,
    `Телефон: ${phone ?? "—"}`,
    `Ім'я: ${name}`,
    socialLine ? `Соцмережі: ${socialLine}` : null,
    descLine ? `Опис проблеми: ${descLine}` : null,
  ].filter(Boolean) as string[];

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Консультація: ${name}`,
      description: descriptionLines.join("\n"),
      start: {
        dateTime: start.toISO()!,
        timeZone: KYIV_TZ,
      },
      end: {
        dateTime: end.toISO()!,
        timeZone: KYIV_TZ,
      },
      colorId: "7",
    },
  });

  return { eventId: event.data.id };
}
