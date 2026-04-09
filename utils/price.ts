/** Тариф «Самостійний старт» практикуму (грн), як у блоці на головній */
export const PRAKTIKUM_SELF_PRICE_UAH = 1;

/** Тариф «З психологом» (грн) */
export const PRAKTIKUM_PSYCHOLOGIST_PRICE_UAH = 1;

export function getCurrentPrice(): number {
  return PRAKTIKUM_SELF_PRICE_UAH;
}

export function getSessionPriceUah(): number {
  const n = Number(process.env.SESSION_PRICE_UAH);
  if (Number.isFinite(n) && n > 0) return Math.round(n);
  return 1;
}
