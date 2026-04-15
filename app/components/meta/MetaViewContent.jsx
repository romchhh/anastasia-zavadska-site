"use client";

import { useEffect, useRef } from "react";

/**
 * Один раз на відкриття сторінки послуги (ViewContent у Pixel).
 */
export default function MetaViewContent({ contentName, contentIds, value, currency = "UAH" }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;

    const payload = {
      content_ids: contentIds,
      content_type: "product",
      content_name: contentName,
    };
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      payload.value = value;
      payload.currency = currency;
    }
    window.fbq("track", "ViewContent", payload);
  }, [contentName, contentIds, value, currency]);

  return null;
}
