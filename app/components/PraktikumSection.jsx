"use client";

import { PRAKTIKUM_SELF_FEATURES, PRAKTIKUM_WITH_FEATURES } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";
import { SECTION_INTRO_LEAD, SECTION_INTRO_TITLE } from "./sectionIntroStyles";

const PILL_BLUE = "#B4C7F9";
const RING_BLUE = "#92B2FF";

const BTN_TEXT = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(15px, 1.75vw, 20px)",
  fontWeight: 700,
  fontStyle: "normal",
  lineHeight: 1,
  letterSpacing: 0,
};

const cardStyle = {
  background: "#fff",
  borderRadius: "28px",
  border: "1px solid rgba(225, 232, 250, 0.95)",
  boxShadow:
    "0 20px 56px rgba(110, 140, 200, 0.12), 0 6px 20px rgba(130, 160, 220, 0.08)",
  boxSizing: "border-box",
};

function FeatureCell({ active, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        minHeight: "clamp(48px, 5.5vw, 58px)",
        padding: "clamp(6px, 1vw, 10px) 0",
        boxSizing: "border-box",
      }}
    >
      {active ? (
        <span
          aria-hidden
          style={{
            width: 28,
            height: 28,
            marginTop: 3,
            borderRadius: "50%",
            border: `2.5px solid ${RING_BLUE}`,
            flexShrink: 0,
            boxSizing: "border-box",
            background: "transparent",
          }}
        />
      ) : (
        <span
          aria-hidden
          style={{
            width: 28,
            height: 28,
            marginTop: 0,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "22px",
            fontWeight: 300,
            color: "#c4c4c4",
            lineHeight: 1,
          }}
        >
          ×
        </span>
      )}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(15px, 1.65vw, 18px)",
          fontWeight: 500,
          color: active ? "#111" : "#b8b8b8",
          lineHeight: 1.55,
          textAlign: "left",
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

function CtaButton({ btnLabel }) {
  return (
    <button
      type="button"
      style={{
        background: PILL_BLUE,
        border: "none",
        borderRadius: "999px",
        padding: "16px 18px 16px 28px",
        minHeight: "58px",
        ...BTN_TEXT,
        color: "#fff",
        cursor: "pointer",
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
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(140, 170, 230, 0.55)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 22px rgba(160, 185, 235, 0.45)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <span style={{ textAlign: "left", flex: "1 1 auto", paddingRight: 12 }}>{btnLabel}</span>
      <span
        style={{
          background: "#fff",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ArrowIcon variant="periwinkle" height={18} />
      </span>
    </button>
  );
}

/** Дві окремі картки; список на сітці рядків — однакова висота рядків у обох колонках при однаковій ширині */
function PrCard({ title, features, oldPrice, price, btnLabel }) {
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
          <CtaButton btnLabel={btnLabel} />
        </div>
      </div>
    </div>
  );
}

export default function PraktikumSection() {
  return (
    <section
      id="практикум"
      style={{
        background: "#fff",
        padding: "clamp(64px, 8vw, 96px) clamp(24px, 6vw, 120px) clamp(72px, 9vw, 104px)",
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1000px, 120vw)",
          height: "min(900px, 110vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(180, 205, 255, 0.55) 0%, rgba(220, 232, 255, 0.35) 45%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.85,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(520px, 70vw)",
          height: "min(520px, 70vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(180, 200, 250, 0.4) 0%, transparent 65%)",
          filter: "blur(48px)",
          opacity: 0.6,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="praktikum-inner" style={{ position: "relative", zIndex: 1, maxWidth: "1120px", margin: "0 auto" }}>
        <h2
          style={{
            ...SECTION_INTRO_TITLE,
            margin: "0 0 clamp(20px, 3vw, 28px) 0",
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
          />
          <PrCard
            title={"З підтримкою\nпсихолога"}
            features={PRAKTIKUM_WITH_FEATURES}
            oldPrice="10500 грн"
            price="5400 грн"
            btnLabel="Почати з психологом"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #практикум .praktikum-tagline-pill {
            padding: 14px 22px !important;
            font-size: clamp(14px, 3.6vw, 17px) !important;
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
