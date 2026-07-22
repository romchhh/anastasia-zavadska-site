"use client";

import { CircleCheck, UserRound } from "lucide-react";
import { HERO_PHOTO, INDIVIDUAL_BOOKING_PAGE } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";
import {
  NAV_HEIGHT_DESKTOP,
  PAGE_GUTTER_X,
  SECTION_INTRO_LEAD,
  SECTION_TITLE_MAX_WIDTH,
} from "./sectionIntroStyles";

const accent = "#92B2FF";

const HERO_BULLETS = [
  "Гештальт-психотерапія",
  "Індивідуальна та групова терапія онлайн",
];

export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        background: "#fff",
        padding: `clamp(40px, 6vw, 72px) ${PAGE_GUTTER_X}`,
        minHeight: `calc(100vh - ${NAV_HEIGHT_DESKTOP}px)`,
        boxSizing: "border-box",
      }}
    >
      <div className="hero-column">
        <div
          className="hero-copy"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: SECTION_TITLE_MAX_WIDTH,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
        <div className="hero-text" style={{ minWidth: 0, width: "100%" }}>
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(32px, 5.2vw, 80px)",
            fontWeight: 900,
            lineHeight: "0.94",
            color: "#111",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            margin: "0 0 clamp(18px, 2.4vw, 28px) 0",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <span className="hero-title-line">Анастасія</span>
          <span className="hero-title-line">Завадська</span>
        </h1>

        <span
          className="hero-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(8px, 1.2vw, 12px)",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(13px, 2vw, 26px)",
            fontWeight: 600,
            fontStyle: "normal",
            color: "#fff",
            background: accent,
            padding: "clamp(8px, 1.05vw, 12px) clamp(14px, 1.9vw, 28px)",
            borderRadius: "999px",
            marginBottom: "clamp(16px, 2.4vw, 28px)",
            letterSpacing: "0",
            lineHeight: "1.15",
          }}
        >
          <UserRound
            className="hero-badge-icon"
            aria-hidden
            strokeWidth={2}
            color="#fff"
          />
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
            gap: "clamp(8px, 1.2vw, 12px)",
            width: "100%",
            maxWidth: "100%",
            textAlign: "left",
          }}
        >
          {HERO_BULLETS.map((line) => (
            <li
              key={line}
              className="hero-bullet-item"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(14px, 1.45vw, 17px)",
                fontWeight: 500,
                color: "#111",
                lineHeight: 1.35,
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <span
                aria-hidden
                className="hero-bullet-check"
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "0.06em",
                }}
              >
                <CircleCheck size={20} strokeWidth={2.25} color={accent} aria-hidden />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <p
          className="hero-tagline"
          style={{
            ...SECTION_INTRO_LEAD,
            fontSize: "clamp(16px, 2vw, 22px)",
            fontWeight: 600,
            textAlign: "left",
            margin: "0 0 clamp(14px, 2vw, 22px) 0",
            maxWidth: "100%",
          }}
        >
          Терапія для тих, хто багато досяг, але поступово втратив контакт із собою.
        </p>
        </div>

        <CtaPillButton className="hero-cta" href={INDIVIDUAL_BOOKING_PAGE} icon="calendar">
          Записатися на сесію
        </CtaPillButton>
        </div>
      </div>

      <div
        className="hero-photo"
        style={{
          flexShrink: 0,
          width: "clamp(288px, 32vw, 456px)",
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
          column-gap: clamp(32px, 4.5vw, 64px);
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
        .hero-badge-icon {
          flex-shrink: 0;
          width: clamp(18px, 1.75vw, 26px);
          height: clamp(18px, 1.75vw, 26px);
        }
        .hero-photo {
          grid-column: 2;
          grid-row: 1;
          align-self: center;
          box-shadow:
            0 0 0 5px #fff,
            0 12px 36px rgba(120, 150, 200, 0.22);
          transition: box-shadow 0.28s ease, transform 0.28s ease;
        }
        .hero-photo img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover) {
          .hero-section .hero-photo:hover {
            box-shadow:
              0 0 0 5px #fff,
              0 22px 52px rgba(95, 130, 200, 0.32);
            transform: translateY(-5px);
          }
          .hero-section .hero-photo:hover img {
            transform: scale(1.04);
          }
        }
        @media (min-width: 769px) {
          .hero-section {
            /* вище блок ім’я + бейдж */
            padding-top: clamp(20px, 2.8vw, 44px) !important;
            padding-bottom: clamp(48px, 6.2vw, 88px) !important;
            column-gap: clamp(40px, 5vw, 76px) !important;
          }
          .hero-title {
            margin-bottom: clamp(12px, 1.75vw, 22px) !important;
          }
          .hero-badge {
            /* ≈ на 15% менше за попередній десктопний бейдж; кнопка hero-cta лишається як була */
            font-size: clamp(13px, 1.87vw, 24px) !important;
            padding: clamp(8px, 0.98vw, 12px) clamp(14px, 1.78vw, 26px) !important;
            margin-bottom: clamp(20px, 2.6vw, 32px) !important;
          }
          .hero-bullet-list {
            gap: clamp(10px, 1.35vw, 14px) !important;
            margin-bottom: clamp(18px, 2.4vw, 26px) !important;
            max-width: 100% !important;
          }
          .hero-bullet-item {
            font-size: clamp(15px, 1.55vw, 18px) !important;
            gap: 12px !important;
            line-height: 1.4 !important;
          }
          .hero-bullet-check svg {
            width: clamp(18px, 1.45vw, 22px) !important;
            height: clamp(18px, 1.45vw, 22px) !important;
          }
          .hero-cta {
            margin-top: clamp(28px, 4.2vw, 56px) !important;
          }
          .hero-cta.cta-pill {
            font-size: 19px !important;
            padding: 15px 18px 15px 28px !important;
            gap: 14px !important;
            border-radius: 56px !important;
          }
          .hero-cta .cta-pill__arrow {
            width: 50px !important;
            height: 42px !important;
            min-width: 50px !important;
          }
          .hero-cta .cta-pill__arrow img {
            height: 19px !important;
            width: auto !important;
          }
          /* Ширше за колишні 3/4, висота як раніше від clamp(288px, 32vw, 456px) */
          .hero-photo {
            width: clamp(308px, 36.5vw, 500px) !important;
            height: calc(clamp(288px, 32vw, 456px) * 4 / 3) !important;
            aspect-ratio: unset !important;
          }
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(30px, 9.2vw, 46px) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.025em !important;
            margin-bottom: clamp(12px, 2.2vw, 20px) !important;
          }
          .hero-badge {
            font-size: clamp(11px, 1.7vw, 22px) !important;
            padding: clamp(7px, 0.9vw, 10px) clamp(12px, 1.6vw, 24px) !important;
          }
          .hero-section {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            min-height: unset !important;
            padding-top: clamp(22px, 5vw, 40px) !important;
          }
          .hero-column {
            display: contents;
          }
          .hero-copy {
            display: contents;
          }
          .hero-text {
            order: 1;
            align-items: flex-start;
            width: 100%;
            max-width: min(100%, 820px);
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
          }
          .hero-text .hero-bullet-list,
          .hero-text .hero-tagline {
            text-align: left !important;
          }
          .hero-text .hero-tagline {
            font-size: clamp(15px, 3.8vw, 20px) !important;
          }
          .hero-photo {
            order: 2;
            width: 100% !important;
            max-width: 100% !important;
            margin-left: auto;
            margin-right: auto;
            margin-top: clamp(12px, 3.5vw, 24px) !important;
            aspect-ratio: 5 / 6;
            box-shadow:
              0 0 0 2px #fff,
              0 8px 20px rgba(120, 150, 200, 0.18) !important;
          }
          .hero-cta {
            order: 3;
            align-self: center;
            width: fit-content !important;
            max-width: min(100%, 820px);
            box-sizing: border-box;
            margin-top: clamp(30px, 7vw, 52px) !important;
          }
        }
        @media (max-width: 420px) {
          .hero-title {
            font-size: clamp(28px, 10vw, 40px) !important;
          }
        }
      `}</style>
    </section>
  );
}
