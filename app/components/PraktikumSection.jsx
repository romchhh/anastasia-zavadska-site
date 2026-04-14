"use client";

import { CalendarDays, CheckCircle2, Infinity, X } from "lucide-react";
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
  borderRadius: "25px",
  border: "1px solid rgba(225, 232, 250, 0.95)",
  boxShadow:
    "0 18px 50px rgba(110, 140, 200, 0.12), 0 5px 18px rgba(130, 160, 220, 0.08)",
  boxSizing: "border-box",
};

const FEATURE_ICON = 23;

function FeatureCell({ active, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "clamp(9px, 1.44vw, 13px)",
        minHeight: "clamp(40px, 4.5vw, 50px)",
        padding: "clamp(7px, 1vw, 11px) 0",
        boxSizing: "border-box",
      }}
    >
      {active ? (
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <CheckCircle2 size={FEATURE_ICON} strokeWidth={2.25} color={RING_BLUE} aria-hidden />
        </span>
      ) : (
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 0,
          }}
        >
          <X size={FEATURE_ICON} strokeWidth={2} color="#9ca8c4" aria-hidden />
        </span>
      )}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(14px, 1.67vw, 17px)",
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
        padding: "clamp(14px, 1.98vw, 20px) clamp(14px, 2.25vw, 20px) clamp(14px, 1.98vw, 20px) clamp(22px, 2.7vw, 29px)",
        minHeight: "clamp(47px, 6.3vw, 58px)",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "clamp(15px, 2.57vw, 20px)",
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
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.14), 0 8px 26px rgba(55,85,160,0.36), 0 2px 8px rgba(0,0,0,0.08)",
        transition: "box-shadow .2s, transform .15s, filter .15s",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.1), 0 14px 38px rgba(45,70,140,0.45), 0 4px 12px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.filter = "brightness(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.14), 0 8px 26px rgba(55,85,160,0.36), 0 2px 8px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.filter = "";
      }}
    >
      <span style={{ textAlign: "left", flex: "1 1 auto", paddingRight: 11, minWidth: 0 }}>{btnLabel}</span>
      <span
        className="praktikum-cta-btn__arrow-ring"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "2px solid #fff",
          borderRadius: "50%",
          width: 43,
          height: 43,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxSizing: "border-box",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <ArrowIcon variant="white" height={18} />
      </span>
    </button>
  );
}

/** Дві окремі картки; список на сітці рядків — однакова висота рядків у обох колонках при однаковій ширині */
function PrCard({ title, features, oldPrice, price, btnLabel, onPay, payDisabled, highlighted }) {
  return (
    <div
      className={
        highlighted ? "praktikum-card praktikum-card--highlighted" : "praktikum-card"
      }
      style={{
        ...cardStyle,
        flex: "1 1 0",
        minWidth: "min(100%, 252px)",
        maxWidth: "468px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "clamp(36px, 4.05vw, 47px) clamp(25px, 3.15vw, 36px) clamp(32px, 3.6vw, 40px)",
        textAlign: "left",
      }}
    >
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(22px, 2.57vw, 29px)",
          fontWeight: 900,
          color: "#111",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          lineHeight: 1.2,
          margin: "0 0 clamp(25px, 3.15vw, 32px) 0",
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
      >
        {title}
      </h3>

      <ul
        style={{
          listStyle: "none",
          margin: "0 0 clamp(22px, 2.7vw, 29px) 0",
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
        <div style={{ marginTop: "clamp(16px, 2.25vw, 22px)" }}>
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
          className="praktikum-tagline-outer"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 0 clamp(16px, 2.5vw, 24px) 0",
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
              margin: 0,
              maxWidth: "min(100%, 480px)",
              padding: "clamp(16px, 2vw, 20px) clamp(28px, 4vw, 40px)",
              borderRadius: "999px",
              background: PILL_BLUE,
              boxShadow: "0 8px 28px rgba(160, 185, 230, 0.4)",
              boxSizing: "border-box",
            }}
          >
            <span className="praktikum-tagline-line praktikum-tagline-line--main">
              <span className="praktikum-tagline-icon-wrap" aria-hidden>
                <CalendarDays
                  className="praktikum-tagline-icon"
                  strokeWidth={2}
                  color="#fff"
                />
              </span>
              <span className="praktikum-tagline-text">7-денна психологічна програма</span>
            </span>
            <span className="praktikum-tagline-line praktikum-tagline-line--sub">
              <span className="praktikum-tagline-icon-wrap" aria-hidden>
                <Infinity
                  className="praktikum-tagline-icon"
                  strokeWidth={2}
                  color="#fff"
                />
              </span>
              <span className="praktikum-tagline-text">Почати можна будь-коли</span>
            </span>
          </p>
        </div>

        <p
          className="praktikum-intro-lead praktikum-intro-lead--first"
          style={{
            ...SECTION_INTRO_LEAD,
            margin: "0 auto clamp(14px, 2.2vw, 22px)",
            maxWidth: SECTION_TITLE_MAX_WIDTH,
          }}
        >
          Щодня — короткі тексти, запитання й практики. 15–20 хвилин на день,
          які повертають ясність, живість і розуміння, куди рухатися далі.
        </p>
        <p
          className="praktikum-intro-lead praktikum-intro-lead--second"
          style={{
            ...SECTION_INTRO_LEAD,
            margin: "0 auto clamp(40px, 6vw, 56px)",
            maxWidth: SECTION_TITLE_MAX_WIDTH,
          }}
        >
          Не марафон. Не самооптимізація. М&apos;який вхід у контакт із собою.
        </p>

        <div
          className="praktikum-cards"
          style={{
            position: "relative",
            display: "flex",
            gap: "clamp(18px, 2.7vw, 29px)",
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
            highlighted
          />
        </div>
      </div>

      <style>{`
        #практикум .praktikum-card--highlighted {
          background: linear-gradient(
            168deg,
            #eef3ff 0%,
            #e2ebff 42%,
            #d6e2ff 100%
          ) !important;
          border: 3px solid #3d5696 !important;
          box-shadow:
            0 13px 40px rgba(95, 125, 200, 0.22),
            0 5px 16px rgba(120, 150, 210, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.75) !important;
        }
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
        /* Два рядки: іконка + текст, кожен ряд відцентровано в плашці */
        #практикум .praktikum-tagline-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: fit-content;
          max-width: min(100%, 480px);
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }
        #практикум .praktikum-tagline-line {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          box-sizing: border-box;
        }
        #практикум .praktikum-tagline-line--sub {
          opacity: 0.98;
        }
        #практикум .praktikum-tagline-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          line-height: 0;
        }
        #практикум .praktikum-tagline-icon {
          flex-shrink: 0;
          width: clamp(20px, 2.2vw, 24px);
          height: clamp(20px, 2.2vw, 24px);
          display: block;
        }
        #практикум .praktikum-tagline-icon svg {
          display: block;
        }
        #практикум .praktikum-tagline-text {
          min-width: 0;
          text-align: center;
          line-height: 1.35;
        }
        #практикум .praktikum-price-block {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: baseline;
          gap: 5px 11px;
          text-align: center;
          padding-top: clamp(7px, 1.35vw, 11px);
          box-sizing: border-box;
        }
        #практикум .praktikum-price-label {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(14px, 1.4vw, 16px);
          font-weight: 600;
          color: var(--price-dark-soft);
        }
        #практикум .praktikum-price-old {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(13px, 1.22vw, 14px);
          font-weight: 500;
          color: #aaa;
          text-decoration: line-through;
          white-space: nowrap;
        }
        #практикум .praktikum-price-current {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(23px, 2.52vw, 29px);
          font-weight: 800;
          color: var(--price-dark);
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          #практикум {
            padding-top: clamp(28px, 4.5vw, 48px) !important;
            padding-bottom: clamp(40px, 5.5vw, 64px) !important;
          }
          #практикум .praktikum-tagline-outer {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-bottom: clamp(12px, 2vw, 20px) !important;
          }
          #практикум .praktikum-tagline-pill {
            max-width: 100% !important;
            width: 100%;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 12px 16px !important;
            font-size: clamp(16px, 3.9vw, 17px) !important;
            text-align: center !important;
          }
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
            row-gap: 5px;
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
          #практикум .praktikum-tagline-icon {
            width: 1.2em !important;
            height: 1.2em !important;
            min-width: 1.2em !important;
            min-height: 1.2em !important;
          }
          #практикум .praktikum-tagline-text {
            text-align: center !important;
            line-height: 1.38 !important;
            display: block;
          }
          /* Ширші картки: на всю ширину екрана з вужчим gutter за секційного (як картки послуг) */
          #практикум .praktikum-cards {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100vw !important;
            margin-left: calc(50% - 50vw) !important;
            margin-right: calc(50% - 50vw) !important;
            padding-left: clamp(10px, 2.8vw, 18px) !important;
            padding-right: clamp(10px, 2.8vw, 18px) !important;
            box-sizing: border-box !important;
            gap: clamp(14px, 3vw, 22px) !important;
          }
          #практикум .praktikum-card {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
