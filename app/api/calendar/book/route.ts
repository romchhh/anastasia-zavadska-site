import { NextRequest, NextResponse } from "next/server";
import { insertConsultationEvent, isGoogleCalendarConfigured } from "@/lib/googleCalendarServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      { error: "Google Calendar is not configured" },
      { status: 503 }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const date = typeof body.date === "string" ? body.date : "";
  const time = typeof body.time === "string" ? body.time : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone : undefined;
  const consultationType =
    typeof body.consultationType === "string" ? body.consultationType : undefined;
  const social =
    typeof body.social === "string" ? body.social.trim().slice(0, 500) : undefined;
  const description =
    typeof body.description === "string" ? body.description.trim().slice(0, 2000) : undefined;

  if (!date || !time || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const { eventId } = await insertConsultationEvent({
      date,
      time,
      name,
      phone,
      consultationType,
      social: social || undefined,
      description: description || undefined,
    });
    return NextResponse.json({ eventId });
  } catch (err) {
    const status =
      err && typeof err === "object" && "statusCode" in err && (err as { statusCode?: number }).statusCode === 409
        ? 409
        : 500;
    if (status === 409) {
      return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
    }
    console.error("[calendar/book]", err);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
