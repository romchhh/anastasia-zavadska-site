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
        gap: 14,
        minHeight: 68,
        padding: "18px 28px 18px 32px",
        borderRadius: 999,
        background: "#fff",
        border: "2px solid #5f7ad4",
        color: "#3d5696",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "clamp(15px, 3.7vw, 19px)",
        fontWeight: 800,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "none",
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
        <ArrowIcon variant="blue" height={26} />
      </span>
    </Link>
  );
}
