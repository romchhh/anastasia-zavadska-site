"use client";

import { useCallback, useState } from "react";
import { PRAKTIKUM_SELF_FEATURES, PRAKTIKUM_WITH_FEATURES } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";
import {
  PAGE_GUTTER_X,
  SECTION_INTRO_LEAD,
  SECTION_INTRO_TITLE,
  SECTION_LAYOUT_MAX_WIDTH,
  SECTION_TITLE_MAX_WIDTH,
} from "./sectionIntroStyles";
import { PRAKTIKUM_PSYCHOLOGIST_PRICE_UAH, PRAKTIKUM_SELF_PRICE_UAH } from "@/utils/price";
import { submitWayForPayForm } from "@/lib/wayforpayClientSubmit";

const PILL_BLUE = "#B4C7F9";
/** Кнопки оплати практикуму — темніший фон під білий текст (як CtaPillButton) */
const PRAKTIKUM_CTA_BG = "#5f7ad4";
const RING_BLUE = "#92B2FF";

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  border: "1px solid rgba(225, 232, 250, 0.95)",
  boxShadow:
    "0 20px 56px rgba(110, 140, 200, 0.12), 0 6px 20px rgba(130, 160, 220, 0.08)",
  boxSizing: "border-box",
};

const FEATURE_ICON = 26;

function FeatureCell({ active, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "clamp(10px, 1.6vw, 14px)",
        minHeight: "clamp(44px, 5vw, 56px)",
        padding: "clamp(8px, 1.1vw, 12px) 0",
        boxSizing: "border-box",
      }}
    >
      {active ? (
        <span
          aria-hidden
          style={{
            width: FEATURE_ICON,
            height: FEATURE_ICON,
            marginTop: 1,
            borderRadius: "50%",
            border: `2px solid ${RING_BLUE}`,
            flexShrink: 0,
            boxSizing: "border-box",
            background: "transparent",
          }}
        />
      ) : (
        <span
          aria-hidden
          style={{
            width: FEATURE_ICON,
            height: FEATURE_ICON,
            marginTop: 0,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(22px, 3.2vw, 28px)",
            fontWeight: 500,
            color: "#9ca8c4",
            lineHeight: 0.85,
          }}
        >
          ×
        </span>
      )}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(16px, 1.85vw, 19px)",
          fontWeight: active ? 500 : 400,
          color: active ? "#111" : "#5c6478",
          lineHeight: 1.5,
          textAlign: "left",
          letterSpacing: 0,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function PriceBlock({ oldPrice, price }) {
  return (
    <div className="praktikum-price-block">
      <span className="praktikum-price-label">Ціна:</span>
      <span className="praktikum-price-old">{oldPrice}</span>
      <span className="praktikum-price-current">{price}</span>
    </div>
  );
}

function CtaButton({ btnLabel, onClick, disabled }) {
  return (
    <button
      type="button"
      className="praktikum-cta-btn"
      disabled={disabled}
      onClick={onClick}
      style={{
        background: PRAKTIKUM_CTA_BG,
        border: "none",
        borderRadius: "999px",
        padding: "clamp(15px, 2.2vw, 22px) clamp(16px, 2.5vw, 22px) clamp(15px, 2.2vw, 22px) clamp(24px, 3vw, 32px)",
        minHeight: "clamp(52px, 7vw, 64px)",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "clamp(17px, 2.85vw, 22px)",
        lineHeight: "100%",
        letterSpacing: 0,
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.82 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textTransform: "none",
        width: "100%",
        boxShadow: "0 6px 22px rgba(55, 85, 160, 0.38)",
        transition: "box-shadow .2s, transform .15s",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(45, 70, 140, 0.48)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 22px rgba(55, 85, 160, 0.38)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <span style={{ textAlign: "left", flex: "1 1 auto", paddingRight: 12, minWidth: 0 }}>{btnLabel}</span>
      <span
        className="praktikum-cta-btn__arrow-ring"
        style={{
          background: "transparent",
          border: "2px solid #fff",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <ArrowIcon variant="white" height={20} />
      </span>
    </button>
  );
}

/** Дві окремі картки; список на сітці рядків — однакова висота рядків у обох колонках при однаковій ширині */
function PrCard({ title, features, oldPrice, price, btnLabel, onPay, payDisabled }) {
  return (
    <div
      className="praktikum-card"
      style={{
        ...cardStyle,
        flex: "1 1 0",
        minWidth: "min(100%, 280px)",
        maxWidth: "520px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "clamp(40px, 4.5vw, 52px) clamp(28px, 3.5vw, 40px) clamp(36px, 4vw, 44px)",
        textAlign: "left",
      }}
    >
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(24px, 2.85vw, 32px)",
          fontWeight: 900,
          color: "#111",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          lineHeight: 1.2,
          margin: "0 0 clamp(28px, 3.5vw, 36px) 0",
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
      >
        {title}
      </h3>

      <ul
        style={{
          listStyle: "none",
          margin: "0 0 clamp(24px, 3vw, 32px) 0",
          padding: 0,
          flex: "1 1 auto",
          display: "grid",
          gridTemplateRows: "repeat(6, minmax(min-content, auto))",
          alignContent: "start",
          gap: 0,
        }}
      >
        {features.map(({ text, active }) => (
          <li key={text} style={{ margin: 0, padding: 0 }}>
            <FeatureCell active={active} text={text} />
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "auto", width: "100%" }}>
        <PriceBlock oldPrice={oldPrice} price={price} />
        <div style={{ marginTop: "clamp(18px, 2.5vw, 24px)" }}>
          <CtaButton
            btnLabel={payDisabled ? "Завантаження…" : btnLabel}
            onClick={onPay}
            disabled={payDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default function PraktikumSection() {
  const [payLoading, setPayLoading] = useState(null);

  const startPraktikumPayment = useCallback(async (tariff) => {
    const isPsych = tariff === "psychologist";
    setPayLoading(isPsych ? "psych" : "self");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentKind: "journey",
          tariffType: isPsych ? "psychologist" : "self",
          price: isPsych ? PRAKTIKUM_PSYCHOLOGIST_PRICE_UAH : PRAKTIKUM_SELF_PRICE_UAH,
          eventTitle: isPsych
            ? "Практикум «Подорож до себе» — з підтримкою психолога"
            : "Практикум «Подорож до себе» — самостійний старт",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.data) {
        throw new Error(json?.error || "payment");
      }
      submitWayForPayForm(json.data);
    } catch (e) {
      console.error(e);
      alert("Не вдалося відкрити оплату. Спробуйте пізніше або напишіть у Telegram.");
    } finally {
      setPayLoading(null);
    }
  }, []);

  return (
    <section
      id="практикум"
      style={{
        background: "#fff",
        padding: `clamp(44px, 5.5vw, 68px) ${PAGE_GUTTER_X} clamp(56px, 7vw, 88px)`,
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
        overflowX: "clip",
      }}
    >
      {/* Світіння прив’язане до секції, не до блоку карток — щоб не обрізалось по висоті/ширині карток */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          transform: "translate(-50%, -50%)",
          width: "min(1400px, 155vw)",
          height: "min(1100px, 135vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(110, 145, 230, 0.78) 0%, rgba(150, 175, 235, 0.5) 38%, rgba(210, 222, 255, 0.28) 58%, transparent 72%)",
          filter: "blur(52px)",
          opacity: 0.98,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          transform: "translate(-50%, -50%)",
          width: "min(780px, 92vw)",
          height: "min(780px, 92vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(95, 130, 220, 0.55) 0%, rgba(160, 185, 240, 0.35) 42%, transparent 68%)",
          filter: "blur(56px)",
          opacity: 0.88,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="praktikum-inner"
        style={{ position: "relative", zIndex: 1, maxWidth: SECTION_LAYOUT_MAX_WIDTH, margin: "0 auto" }}
      >
        <h2
          className="praktikum-section-heading"
          style={{
            ...SECTION_INTRO_TITLE,
            marginTop: 0,
            marginBottom: "clamp(20px, 3vw, 28px)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span className="praktikum-title-part">Практикум</span>
          <span className="praktikum-title-part">«Подорож до себе»</span>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 0 clamp(20px, 3vw, 28px) 0",
            padding: "0 8px",
            boxSizing: "border-box",
          }}
        >
          <p
            className="praktikum-tagline-pill"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(15px, 1.85vw, 19px)",
              fontWeight: 600,
              lineHeight: 1.38,
              letterSpacing: "0.01em",
              color: "#fff",
              textAlign: "center",
              margin: 0,
              maxWidth: "min(100%, 480px)",
              padding: "clamp(16px, 2vw, 20px) clamp(28px, 4vw, 40px)",
              borderRadius: "999px",
              background: PILL_BLUE,
              boxShadow: "0 8px 28px rgba(160, 185, 230, 0.4)",
              boxSizing: "border-box",
            }}
          >
            <span style={{ display: "block" }}>7-денна психологічна програма</span>
            <span style={{ display: "block", opacity: 0.98, marginTop: 6 }}>Почати можна будь-коли</span>
          </p>
        </div>

        <p
          className="praktikum-intro-lead"
          style={{
            ...SECTION_INTRO_LEAD,
            margin: "0 auto clamp(40px, 6vw, 56px)",
            maxWidth: SECTION_TITLE_MAX_WIDTH,
          }}
        >
          Щодня — короткі тексти, запитання й практики. 15–20 хвилин на день,
          які повертають ясність, живість і розуміння, куди рухатися далі.
          <br />
          Не марафон. Не самооптимізація. М&apos;який вхід у контакт із собою.
        </p>

        <div
          className="praktikum-cards"
          style={{
            position: "relative",
            display: "flex",
            gap: "clamp(20px, 3vw, 32px)",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <PrCard
            title={"Самостійний старт\n\n"}
            features={PRAKTIKUM_SELF_FEATURES}
            oldPrice="4500 грн"
            price="595 грн"
            btnLabel="Почати самостійно"
            onPay={() => startPraktikumPayment("self")}
            payDisabled={payLoading === "self"}
          />
          <PrCard
            title={"З підтримкою\nпсихолога"}
            features={PRAKTIKUM_WITH_FEATURES}
            oldPrice="10500 грн"
            price="5400 грн"
            btnLabel="Почати з психологом"
            onPay={() => startPraktikumPayment("psychologist")}
            payDisabled={payLoading === "psych"}
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          #практикум h2.praktikum-section-heading .praktikum-title-part:first-child::after {
            content: " ";
          }
          #практикум h2.praktikum-section-heading .praktikum-title-part:last-child {
            white-space: nowrap;
          }
        }
        #практикум .praktikum-cta-btn {
          leading-trim: none;
        }
        #практикум .praktikum-price-block {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: baseline;
          gap: 6px 12px;
          text-align: center;
          padding-top: clamp(8px, 1.5vw, 12px);
          box-sizing: border-box;
        }
        #практикум .praktikum-price-label {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(16px, 1.55vw, 18px);
          font-weight: 600;
          color: #333;
        }
        #практикум .praktikum-price-old {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(14px, 1.35vw, 16px);
          font-weight: 500;
          color: #aaa;
          text-decoration: line-through;
          white-space: nowrap;
        }
        #практикум .praktikum-price-current {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(26px, 2.8vw, 32px);
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          #практикум h2.praktikum-section-heading {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(4px, 1.2vw, 10px);
          }
          #практикум h2.praktikum-section-heading .praktikum-title-part {
            display: block;
            width: 100%;
            text-align: center;
          }
          #практикум h2.praktikum-section-heading .praktikum-title-part:first-child::after {
            content: none;
          }
          #практикум .praktikum-price-block {
            flex-direction: row;
            justify-content: center;
            row-gap: 6px;
          }
          #практикум .praktikum-price-current {
            flex: 0 0 100%;
            width: 100%;
            text-align: center;
          }
          #практикум .praktikum-intro-lead {
            font-size: clamp(16px, 2.75vw, 22px) !important;
            text-align: left !important;
            max-width: 100% !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          #практикум .praktikum-tagline-pill {
            padding: 14px 22px !important;
            font-size: clamp(16px, 3.9vw, 17px) !important;
          }
          /* Ширші картки: на всю ширину екрана з вужчим gutter за секційного (як картки послуг) */
          #практикум .praktikum-cards {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100vw !important;
            margin-left: calc(50% - 50vw) !important;
            margin-right: calc(50% - 50vw) !important;
            padding-left: clamp(12px, 3.2vw, 22px) !important;
            padding-right: clamp(12px, 3.2vw, 22px) !important;
            box-sizing: border-box !important;
          }
          #практикум .praktikum-card {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
