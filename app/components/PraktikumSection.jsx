"use client";

import { useCallback, useState } from "react";
import { PRAKTIKUM_SELF_FEATURES, PRAKTIKUM_WITH_FEATURES } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";
import { PAGE_GUTTER_X, SECTION_INTRO_LEAD, SECTION_INTRO_TITLE } from "./sectionIntroStyles";
import { PRAKTIKUM_PSYCHOLOGIST_PRICE_UAH, PRAKTIKUM_SELF_PRICE_UAH } from "@/utils/price";
import { submitWayForPayForm } from "@/lib/wayforpayClientSubmit";

const PILL_BLUE = "#B4C7F9";
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
          fontWeight: active ? 700 : 600,
          color: active ? "#111" : "#5c6478",
          lineHeight: 1.5,
          textAlign: "left",
          letterSpacing: active ? "-0.01em" : 0,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function PriceBlock({ oldPrice, price }) {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "clamp(8px, 1.5vw, 12px)",
      }}
    >
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(16px, 1.55vw, 18px)",
          fontWeight: 600,
          color: "#333",
        }}
      >
        Ціна:{" "}
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(14px, 1.35vw, 16px)",
          fontWeight: 500,
          color: "#aaa",
          textDecoration: "line-through",
          marginRight: "10px",
        }}
      >
        {oldPrice}
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(26px, 2.8vw, 32px)",
          fontWeight: 800,
          color: "#111",
          letterSpacing: "-0.02em",
          marginLeft: "8px",
        }}
      >
        {price}
      </span>
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
        background: PILL_BLUE,
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
        boxShadow: "0 6px 22px rgba(160, 185, 235, 0.45)",
        transition: "box-shadow .2s, transform .15s",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(140, 170, 230, 0.55)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 22px rgba(160, 185, 235, 0.45)";
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
        padding: `clamp(64px, 8vw, 96px) ${PAGE_GUTTER_X} clamp(88px, 11vw, 128px)`,
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
      <div className="praktikum-inner" style={{ position: "relative", zIndex: 1, maxWidth: "1120px", margin: "0 auto" }}>
        <h2
          style={{
            ...SECTION_INTRO_TITLE,
            marginTop: 0,
            marginBottom: "clamp(20px, 3vw, 28px)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Практикум «Подорож до себе»
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
            maxWidth: "min(100%, 680px)",
          }}
        >
          Щодня — короткі тексти, запитання й практики. 15–20 хвилин на день,
          які повертають ясність, живість і розуміння, куди рухатися далі.
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
        #практикум .praktikum-cta-btn {
          leading-trim: none;
        }
        @media (max-width: 768px) {
          #практикум .praktikum-intro-lead {
            font-size: clamp(16px, 2.75vw, 22px) !important;
          }
          #практикум .praktikum-tagline-pill {
            padding: 14px 22px !important;
            font-size: clamp(16px, 3.9vw, 17px) !important;
          }
          #практикум .praktikum-cards {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          #практикум .praktikum-card {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
