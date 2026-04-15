"use client";

import { useEffect, useRef } from "react";

/**
 * Purchase у браузері з тим самим event_id, що й CAPI (orderReference), для дедуплікації.
 */
export default function MetaPurchasePixel({ orderRef, value, currency = "UAH", contentName }) {
  const sent = useRef(false);

  useEffect(() => {
    if (!orderRef || sent.current) return;
    sent.current = true;
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;

    const num = typeof value === "number" && Number.isFinite(value) ? value : undefined;
    const payload = {
      content_ids: [orderRef],
      content_type: "product",
      ...(contentName ? { content_name: contentName } : {}),
      ...(num != null ? { value: num, currency } : { currency }),
    };
    window.fbq("track", "Purchase", payload, { eventID: orderRef });
  }, [orderRef, value, currency, contentName]);

  return null;
}
