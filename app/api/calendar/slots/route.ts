import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { buildMonthSlotsData } from "@/lib/calendarMonthSlots";
import { isGoogleCalendarConfigured } from "@/lib/googleCalendarServer";

export const runtime = "nodejs";

const CACHE_SECONDS = 60;

/**
 * GET ?month=YYYY-MM (календар Києва) — усі слоти місяця одним запитом до Google.
 * Кеш даних 1 хв (Data Cache Next.js).
 */
export async function GET(req: NextRequest) {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      { error: "Google Calendar is not configured" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json(
      { error: "month required (YYYY-MM)" },
      { status: 400 }
    );
  }

  try {
    const getCached = unstable_cache(
      async () => buildMonthSlotsData(month),
      ["calendar-month-slots", "v2-50min", month],
      { revalidate: CACHE_SECONDS }
    );

    const slots = await getCached();

    return NextResponse.json(
      { month, slots },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
        },
      }
    );
  } catch (err) {
    if (err instanceof Error && err.message === "Invalid month") {
      return NextResponse.json({ error: "Invalid month" }, { status: 400 });
    }
    console.error("[calendar/slots]", err);
    return NextResponse.json({ error: "Calendar fetch failed" }, { status: 500 });
  }
}
