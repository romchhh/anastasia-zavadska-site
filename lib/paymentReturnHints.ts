/**
 * Дані лише для редіректу після оплати (slotLine тощо).
 * Не вміщаються в returnUrl WayForPay (макс. 255 символів) — тримаємо в RAM за orderReference.
 */
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Hint = { slotLine: string | null };

const g = globalThis as typeof globalThis & { __paymentReturnHints?: Map<string, { hint: Hint; expires: number }> };

function getMap() {
  if (!g.__paymentReturnHints) g.__paymentReturnHints = new Map();
  return g.__paymentReturnHints;
}

function prune(map: ReturnType<typeof getMap>) {
  const now = Date.now();
  for (const [k, v] of map) {
    if (v.expires < now) map.delete(k);
  }
}

export async function savePaymentReturnHint(orderReference: string, hint: Hint): Promise<void> {
  const map = getMap();
  prune(map);
  map.set(orderReference, { hint, expires: Date.now() + TTL_MS });
}

/** Читання без видалення (GET і POST return можуть йти підряд; прибирає TTL). */
export async function getPaymentReturnHint(orderReference: string): Promise<Hint | null> {
  const map = getMap();
  prune(map);
  const v = map.get(orderReference);
  return v ? v.hint : null;
}
