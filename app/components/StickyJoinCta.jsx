"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { INDIVIDUAL_BOOKING_PAGE } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";

export default function StickyJoinCta() {
  const pathname = usePathname();
  if (
    pathname === INDIVIDUAL_BOOKING_PAGE ||
    (pathname && pathname.startsWith(`${INDIVIDUAL_BOOKING_PAGE}/`))
  ) {
    return null;
  }

  return (
    <Link
      href={INDIVIDUAL_BOOKING_PAGE}
      prefetch
      aria-label="Приєднатися — онлайн-сесія, запис"
      className="sticky-join-cta"
      style={{
        position: "fixed",
        right: "max(16px, env(safe-area-inset-right, 0px))",
        bottom: "max(20px, env(safe-area-inset-bottom, 0px))",
        zIndex: 90,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        minHeight: 56,
        padding: "16px 22px 16px 26px",
        borderRadius: 999,
        background: "#fff",
        border: "2px solid #5f7ad4",
        color: "#3d5696",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "clamp(14px, 3.4vw, 17px)",
        fontWeight: 800,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.92), inset 0 -1px 0 rgba(95, 122, 212, 0.12), 0 10px 36px rgba(95, 122, 212, 0.24), 0 3px 12px rgba(0, 0, 0, 0.07)",
        boxSizing: "border-box",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
      }}
    >
      Записатися
      <span
        className="sticky-join-cta__arrow"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-hidden
      >
        <ArrowIcon variant="blue" height={22} />
      </span>
    </Link>
  );
}
