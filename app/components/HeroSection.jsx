"use client";

import { HERO_PHOTO } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";

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
        <h1 className="hero-title" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(56px, 7.5vw, 100px)",
          fontWeight: 900,
          lineHeight: "0.96",
          color: "#111",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          margin: "0 0 24px 0",
        }}>
          Анастасія Завадська
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
          Психологиня<br />
          Працюю в гештальт-підході<br />
          Індивідуальна та групова терапія онлайн
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
          Терапія, яка допомагає повернутися до себе
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

      <CtaPillButton className="hero-cta">Записатися на консультацію</CtaPillButton>

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
          .hero-title {
            font-size: clamp(40px, 11vw, 56px) !important;
            line-height: 0.98 !important;
          }
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
          }
        }
        @media (max-width: 420px) {
          .hero-title {
            font-size: clamp(34px, 12vw, 44px) !important;
          }
        }
      `}</style>
    </section>
  );
}