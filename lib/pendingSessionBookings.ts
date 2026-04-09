import type { BookingNotifyFields } from '@/lib/bookingNotifyFormat';

const TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Entry = { fields: BookingNotifyFields; expires: number };

const g = globalThis as typeof globalThis & { __pendingSessionBookings?: Map<string, Entry> };

function getMap(): Map<string, Entry> {
  if (!g.__pendingSessionBookings) {
    g.__pendingSessionBookings = new Map();
  }
  return g.__pendingSessionBookings;
}

function prune(map: Map<string, Entry>) {
  const now = Date.now();
  for (const [k, v] of map) {
    if (v.expires < now) map.delete(k);
  }
}

/**
 * Чернетка запису до callback WayForPay (лише RAM процесу Node).
 * На serverless окремі інвокації можуть не бачити одні й самі дані — обмеження без зовнішнього сховища.
 */
export async function savePendingSessionBooking(
  orderReference: string,
  fields: BookingNotifyFields
): Promise<void> {
  const map = getMap();
  prune(map);
  map.set(orderReference, {
    fields,
    expires: Date.now() + TTL_MS,
  });
}

export async function takePendingSessionBooking(
  orderReference: string
): Promise<BookingNotifyFields | null> {
  const map = getMap();
  prune(map);
  const v = map.get(orderReference);
  if (!v) return null;
  map.delete(orderReference);
  return v.fields;
}
