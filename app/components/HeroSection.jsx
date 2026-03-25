"use client";

import { HERO_PHOTO } from "../data/siteData";

export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        background: "#fff",
        padding: "64px 120px 64px 120px",
        minHeight: "calc(100vh - 84px)",
        boxSizing: "border-box",
      }}
    >
      <div className="hero-text" style={{ minWidth: 0 }}>
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(56px, 7.5vw, 100px)",
          fontWeight: 900,
          lineHeight: "0.96",
          color: "#111",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          margin: "0 0 24px 0",
        }}>
          Анастасія<br />Завадська
        </h1>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(20px, 2.5vw, 34px)",
          fontWeight: 600,
          color: "#111",
          textTransform: "uppercase",
          lineHeight: "1.15",
          margin: "0 0 20px 0",
          letterSpacing: "0.01em",
        }}>
          Гештальт-психологиня ·<br />
          Індивідуальна та групова<br />
          терапія онлайн
        </p>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(13px, 1.2vw, 17px)",
          fontWeight: 600,
          color: "#999",
          textTransform: "uppercase",
          lineHeight: "1",
          letterSpacing: "0.04em",
          margin: "0 0 48px 0",
        }}>
          Терапія, що повертає тебе до себе — м&apos;яко й у твоєму ритмі
        </p>
      </div>

      {/* Photo — під текстом на мобільному; кнопка нижче */}
      <div
        className="hero-photo"
        style={{
          flexShrink: 0,
          width: "clamp(288px, 36vw, 460px)",
          aspectRatio: "3/4",
          borderRadius: "28px",
          overflow: "hidden",
          background: "#dde4ef",
        }}
      >
        <img
          src={HERO_PHOTO}
          alt="Анастасія Завадська"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      </div>

      <button
        type="button"
        className="hero-cta"
        style={{
          width: "fit-content",
          maxWidth: "100%",
          background: "#A8BFFF",
          border: "none",
          borderRadius: "60px",
          padding: "18px 20px 18px 36px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "24px",
          fontWeight: 700,
          fontStyle: "normal",
          color: "#fff",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "16px",
          textTransform: "uppercase",
          letterSpacing: "0",
          lineHeight: "100%",
          transition: "box-shadow .2s, transform .15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 8px 28px rgba(146,178,255,.5)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "none";
        }}
      >
        Записатися на консультацію
        <span style={{
          background: "#fff",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#92B2FF",
          fontSize: 22,
          fontWeight: 700,
          flexShrink: 0,
        }}>→</span>
      </button>

      <style>{`
        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-rows: auto auto;
          align-items: center;
          column-gap: 48px;
          row-gap: 48px;
        }
        .hero-text {
          grid-column: 1;
          grid-row: 1;
        }
        .hero-cta {
          grid-column: 1;
          grid-row: 2;
          justify-self: start;
        }
        .hero-photo {
          grid-column: 2;
          grid-row: 1 / -1;
          align-self: center;
        }
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            column-gap: 0;
            row-gap: 28px;
            padding: 40px 40px 48px !important;
            min-height: unset !important;
            align-items: stretch;
          }
          .hero-text {
            grid-column: 1;
            grid-row: 1;
          }
          .hero-photo {
            grid-column: 1;
            grid-row: 2;
            width: 100% !important;
            max-width: 100% !important;
            aspect-ratio: 5 / 6;
            align-self: stretch;
            justify-self: stretch;
            margin-top: -14px;
          }
          .hero-cta {
            grid-column: 1;
            grid-row: 3;
            justify-self: center;
            width: fit-content !important;
            max-width: 100%;
            box-sizing: border-box;
            font-size: clamp(16px, 4.2vw, 24px) !important;
            padding: 14px 16px 14px 24px !important;
            white-space: normal !important;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}