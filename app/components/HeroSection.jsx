"use client";

import { HERO_PHOTO, INDIVIDUAL_BOOKING_PAGE } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";
import { SECTION_INTRO_LEAD } from "./sectionIntroStyles";

const accent = "#92B2FF";

const HERO_BULLETS = [
  "Гештальт-підхід",
  "Індивідуальна та групова терапія онлайн",
];

export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        background: "#fff",
        padding: "clamp(48px, 7vw, 88px) clamp(40px, 8vw, 120px)",
        minHeight: "calc(100vh - 84px)",
        boxSizing: "border-box",
      }}
    >
      <div className="hero-column">
        <div className="hero-text" style={{ minWidth: 0 }}>
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(40px, 6.5vw, 96px)",
            fontWeight: 900,
            lineHeight: "0.94",
            color: "#111",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(18px, 2.5vw, 28px) 0",
            width: "100%",
            maxWidth: "min(100%, 920px)",
            boxSizing: "border-box",
          }}
        >
          <span className="hero-title-line">Анастасія</span>
          <span className="hero-title-line">Завадська</span>
        </h1>

        <span
          className="hero-badge"
          style={{
            display: "inline-block",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(17px, 2.8vw, 36px)",
            fontWeight: 600,
            fontStyle: "normal",
            color: "#fff",
            background: accent,
            padding: "clamp(10px, 1.2vw, 14px) clamp(18px, 2.2vw, 32px)",
            borderRadius: "999px",
            marginBottom: "clamp(20px, 2.8vw, 32px)",
            letterSpacing: "0",
            lineHeight: "100%",
          }}
        >
          Психологиня
        </span>

        <ul
          className="hero-bullet-list"
          style={{
            listStyle: "none",
            margin: "0 0 clamp(18px, 2.5vw, 26px) 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.4vw, 14px)",
            width: "100%",
            maxWidth: "min(100%, 38ch)",
            textAlign: "left",
          }}
        >
          {HERO_BULLETS.map((line) => (
            <li
              key={line}
              className="hero-bullet-item"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(16px, 1.85vw, 22px)",
                fontWeight: 600,
                color: "#111",
                lineHeight: 1.35,
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <span
                aria-hidden
                style={{
                  color: accent,
                  fontWeight: 800,
                  flexShrink: 0,
                  lineHeight: "inherit",
                  marginTop: "0.06em",
                }}
              >
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <p
          className="hero-tagline"
          style={{
            ...SECTION_INTRO_LEAD,
            fontSize: "clamp(19px, 2.5vw, 26px)",
            textAlign: "left",
            margin: "0 0 clamp(14px, 2vw, 22px) 0",
            maxWidth: "min(100%, 44ch)",
          }}
        >
          Терапія, що допомагає повернутися до себе
        </p>
        </div>

        <CtaPillButton className="hero-cta" href={INDIVIDUAL_BOOKING_PAGE}>
          Записатися на сесію
        </CtaPillButton>
      </div>

      <div
        className="hero-photo"
        style={{
          flexShrink: 0,
          width: "clamp(280px, 34vw, 440px)",
          aspectRatio: "3/4",
          borderRadius: "24px",
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

      <style>{`
        .hero-title-line {
          display: block;
        }
        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-rows: auto;
          align-items: center;
          column-gap: clamp(40px, 5.5vw, 80px);
        }
        .hero-column {
          grid-column: 1;
          grid-row: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .hero-cta {
          flex-shrink: 0;
          margin-top: 0;
        }
        .hero-photo {
          grid-column: 2;
          grid-row: 1;
          align-self: center;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(36px, 10.5vw, 52px) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.025em !important;
          }
          .hero-section {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            min-height: unset !important;
          }
          .hero-column {
            display: contents;
          }
          .hero-text {
            order: 1;
            align-items: flex-start;
          }
          .hero-text .hero-bullet-list,
          .hero-text .hero-tagline {
            text-align: left !important;
          }
          .hero-text .hero-tagline {
            font-size: clamp(19px, 4.2vw, 26px) !important;
          }
          .hero-photo {
            order: 2;
            width: 100% !important;
            max-width: min(100%, 400px) !important;
            margin-left: auto;
            margin-right: auto;
            aspect-ratio: 5 / 6;
          }
          .hero-cta {
            order: 3;
            align-self: center;
            width: fit-content !important;
            max-width: 100%;
            box-sizing: border-box;
          }
        }
        @media (max-width: 420px) {
          .hero-title {
            font-size: clamp(32px, 11vw, 44px) !important;
          }
        }
      `}</style>
    </section>
  );
}
