/**
 * Ціни на сайті та суми для WayForPay.
 * Практикум — UAH; індивідуальна сесія в WayForPay — USD ($50 за замовчуванням).
 */

/** Тариф «Самостійний старт» практикуму (грн) */
export const PRAKTIKUM_SELF_PRICE_UAH = 595;

/** Тариф «З психологом» (грн) */
export const PRAKTIKUM_PSYCHOLOGIST_PRICE_UAH = 5400;

/** Індивідуальна консультація — сума в USD (дефолт) */
export const SESSION_CONSULTATION_PRICE_USD = 50;

/** Підпис для UI (картки, форма) */
export const SESSION_CONSULTATION_PRICE_LABEL = "$50";

/** Застаріла «повна» ціна практикуму для перекресленого блоку (грн), лише візуально */
export const PRAKTIKUM_SELF_OLD_PRICE_UAH = 4500;
export const PRAKTIKUM_PSYCHOLOGIST_OLD_PRICE_UAH = 10500;

export function getCurrentPrice(): number {
  return PRAKTIKUM_SELF_PRICE_UAH;
}

/**
 * Сума за індивідуальну сесію в WayForPay (USD).
 * Опційно SESSION_PRICE_USD у .env (наприклад 50).
 */
export function getSessionPriceUsd(): number {
  const n = Number(process.env.SESSION_PRICE_USD);
  if (Number.isFinite(n) && n > 0) return n;
  return SESSION_CONSULTATION_PRICE_USD;
}

export function formatPriceUah(amount: number): string {
  return `${amount.toLocaleString("uk-UA")} грн`;
}
