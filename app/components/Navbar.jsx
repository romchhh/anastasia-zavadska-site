"use client";
import { useState } from "react";
import { NAV_LINKS } from "../data/siteData";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="main-nav"
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
        {/* Mobile: ім’я зліва */}
        <div
          className="nav-mobile-brand"
          style={{
            display: "none",
            alignItems: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            lineHeight: 1.2,
            maxWidth: "55%",
          }}
        >
          Анастасія<br />Завадська
        </div>

        {/* Desktop nav links */}
        <ul style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "36px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  color: "#fff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "15px",
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

        {/* Right side: CTA button + burger */}
        <div
          className="nav-right"
          style={{ display: "flex", alignItems: "center", gap: "16px", height: "100%", marginLeft: "auto" }}
        >
          {/* Outline CTA button — desktop only; 80% of nav bar height */}
          <button
            type="button"
            className="nav-cta-btn"
            style={{
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.85)",
              borderRadius: "50px",
              boxSizing: "border-box",
              height: "80%",
              padding: "0 18px 0 44px",
              minWidth: "268px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              letterSpacing: ".04em",
              transition: "background .2s, color .2s, box-shadow .2s",
              whiteSpace: "nowrap",
            }}
          >
            Записатися
            <span
              className="nav-cta-btn-arrow"
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "2px solid rgba(255,255,255,0.7)",
                borderRadius: "50%",
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 17,
                flexShrink: 0,
                transition: "background .2s, border-color .2s, color .2s",
                boxSizing: "border-box",
              }}
            >→</span>
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
          padding: "92px 40px 48px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity .3s ease",
        }}
      >
        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "32px",
                fontWeight: 800,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: ".02em",
                borderBottom: "1px solid rgba(255,255,255,.25)",
                paddingBottom: "20px",
                paddingTop: i === 0 ? 0 : "12px",
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
        <button
          style={{
            background: "#fff",
            border: "none",
            borderRadius: "60px",
            padding: "16px 16px 16px 32px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "15px",
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
            transition: "opacity .35s ease .36s, transform .35s ease .36s",
          }}
          onClick={() => setMenuOpen(false)}
        >
          Записатися на консультацію
          <span style={{
            background: "#92B2FF",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 20,
            flexShrink: 0,
          }}>→</span>
        </button>
      </div>

      <style>{`
        .main-nav {
          height: 84px;
          padding: 0 120px;
        }
        .nav-cta-btn:hover {
          background: #fff !important;
          color: #92B2FF !important;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
        }
        .nav-cta-btn:hover .nav-cta-btn-arrow {
          background: #92B2FF !important;
          border-color: #92B2FF !important;
          color: #fff !important;
        }
        @media (max-width: 768px) {
          .main-nav {
            height: 68px;
            padding: 0 40px;
          }
          .nav-mobile-brand { display: flex !important; }
          .nav-desktop { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}