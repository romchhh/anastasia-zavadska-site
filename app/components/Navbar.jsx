"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { INDIVIDUAL_BOOKING_PAGE, NAV_LINKS, navLinkHref } from "../data/siteData";
import { PAGE_GUTTER_X } from "./sectionIntroStyles";
import { DualRoundArrow, ArrowIcon } from "./ArrowIcon";

function scrollToElementById(id) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavBookingCta = () => {
    if (pathname === INDIVIDUAL_BOOKING_PAGE || pathname.startsWith(`${INDIVIDUAL_BOOKING_PAGE}/`)) {
      if (!scrollToElementById("booking-calendar")) {
        if (!scrollToElementById("онлайн-запис")) {
          window.location.hash = "booking-calendar";
        }
      }
      return;
    }
    router.push(INDIVIDUAL_BOOKING_PAGE);
  };

  return (
    <>
      <nav
        className={`main-nav${scrolled ? " main-nav--scrolled" : ""}`}
        style={{
          background: "#92B2FF",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxSizing: "border-box",
        }}
      >
        {/* Логотип-текст зліва */}
        <Link
          href="/"
          className="nav-brand"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            lineHeight: 1.05,
            maxWidth: "fit-content",
            textDecoration: "none",
          }}
        >
          ANASTASIIA<br />ZAVADSKA
        </Link>

        {/* Desktop nav links */}
        <ul style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "36px",
          marginLeft: "clamp(28px, 3.2vw, 64px)",
          listStyle: "none",
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          padding: 0,
        }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={navLinkHref(l, pathname)}
                style={{
                  color: "#fff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: ".04em",
                  textDecoration: "none",
                  opacity: 0.95,
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.target.style.opacity = 1)}
                onMouseLeave={e => (e.target.style.opacity = 0.95)}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: CTA + burger */}
        <div
          className="nav-right"
          style={{ display: "flex", alignItems: "center", gap: "16px", height: "100%", marginLeft: "auto" }}
        >
          {/* Outline CTA button — desktop only; 80% of nav bar height */}
          <button
            type="button"
            className="nav-cta-btn"
            onClick={handleNavBookingCta}
            style={{
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.85)",
              borderRadius: "50px",
              boxSizing: "border-box",
                  height: 44,
                  alignSelf: "center",
                  padding: "0 12px 0 32px",
                  minWidth: "228px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "15px",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "100%",
              letterSpacing: 0,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              transition: "background .2s, color .2s, box-shadow .2s, transform .2s",
              whiteSpace: "nowrap",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 22px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            Записатися
            <span
              className="nav-cta-btn-arrow"
              style={{
                background: "linear-gradient(180deg, #fff 0%, #f3f5fc 100%)",
                border: "2px solid transparent",
                borderRadius: 999,
                width: 38,
                height: 28,
                minWidth: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                lineHeight: 1,
                transition: "background .2s, border-color .2s, color .2s, box-shadow .2s",
                boxSizing: "border-box",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 2px rgba(80,100,160,0.06), 0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <DualRoundArrow height={12} />
            </span>
          </button>

          {/* Burger button */}
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "6px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px 2px 4px 8px",
              minWidth: 40,
              height: 36,
            }}
          >
            <span style={{
              display: "block", width: 26, height: 4,
              background: "#fff", borderRadius: 2,
              transition: "all .3s",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(10px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 26, height: 4,
              background: "#fff", borderRadius: 2,
              transition: "all .3s",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 26, height: 4,
              background: "#fff", borderRadius: 2,
              transition: "all .3s",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(-10px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className="mobile-menu"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#92B2FF",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 36px 40px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .3s ease",
        }}
      >
        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l}
              href={navLinkHref(l, pathname)}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "26px",
                fontWeight: 800,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: ".02em",
                borderBottom: "1px solid rgba(255,255,255,.25)",
                paddingBottom: "16px",
                paddingTop: i === 0 ? 0 : "10px",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity .35s ease ${i * 0.06}s, transform .35s ease ${i * 0.06}s`,
              }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <a
          href={
            pathname === INDIVIDUAL_BOOKING_PAGE || pathname.startsWith(`${INDIVIDUAL_BOOKING_PAGE}/`)
              ? "#booking-calendar"
              : INDIVIDUAL_BOOKING_PAGE
          }
          onClick={() => setMenuOpen(false)}
          style={{
            background: "#fff",
            border: "none",
            borderRadius: "48px",
            padding: "12px 12px 12px 22px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            fontWeight: 800,
            color: "#92B2FF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "uppercase",
            letterSpacing: ".04em",
            width: "100%",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: "opacity .35s ease .36s, transform .35s ease .36s, box-shadow .2s",
            textDecoration: "none",
            boxSizing: "border-box",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.95), 0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          Записатися на сесію
          <span
            className="mobile-menu-cta-arrow"
            style={{
              background: "linear-gradient(180deg, #fff 0%, #f3f5fc 100%)",
              border: "2px solid #92B2FF",
              borderRadius: 999,
              width: 44,
              height: 34,
              minWidth: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxSizing: "border-box",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(100,130,200,0.15)",
            }}
          >
            <ArrowIcon variant="blue" height={14} />
          </span>
        </a>
      </div>

      <style>{`
        .main-nav {
          height: 76px;
          padding: 0 ${PAGE_GUTTER_X};
        }
        .nav-cta-btn:hover {
          background: #fff !important;
          color: #92B2FF !important;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            0 12px 32px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(0, 0, 0, 0.08) !important;
          transform: translateY(-1px);
        }
        .nav-cta-btn:hover .nav-cta-btn-arrow {
          background: linear-gradient(180deg, #9eb8ff 0%, #92b2ff 100%) !important;
          border-color: #92B2FF !important;
          color: #fff !important;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.12) !important;
        }
        @media (max-width: 768px) {
          .main-nav {
            height: 68px;
            padding: 0 ${PAGE_GUTTER_X};
          }
          .nav-brand {
            font-size: 16px !important;
            line-height: 1.08 !important;
            text-align: center !important;
            align-items: center !important;
          }
          .nav-desktop { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .burger-btn { display: flex !important; }
          .mobile-menu-cta-arrow {
            width: 42px !important;
            height: 32px !important;
            min-width: 42px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </>
  );
}