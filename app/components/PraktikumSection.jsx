"use client";

import { PRAKTIKUM_WITH, PRAKTIKUM_SELF } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";

function PrCard({ title, features, oldPrice, price, btnLabel }) {
  return (
    <div
      className="praktikum-card"
      style={{
        background: "linear-gradient(165deg, rgba(255,255,255,0.97) 0%, rgba(248,251,255,0.92) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "32px",
        border: "1px solid rgba(180,200,240,0.55)",
        padding: "48px 44px 44px",
        flex: 1,
        minWidth: "280px",
        maxWidth: "500px",
        minHeight: "clamp(480px, 52vh, 600px)",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        boxShadow: `
          0 1px 0 rgba(255,255,255,0.98) inset,
          0 24px 64px rgba(100,140,210,.14),
          0 8px 24px rgba(120,160,220,.1)
        `,
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <h3 style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "clamp(22px, 2.4vw, 30px)",
        fontWeight: 900,
        color: "#111",
        textTransform: "uppercase",
        letterSpacing: ".03em",
        lineHeight: 1.12,
        margin: "0 0 36px 0",
        whiteSpace: "pre-line",
        flexShrink: 0,
      }}>
        {title}
      </h3>

      <ul style={{
        listStyle: "none",
        margin: "0 0 28px 0",
        padding: 0,
        flex: "1 1 auto",
        minHeight: "min(120px, 20vh)",
      }}>
        {features.map((item) => (
          <li key={item} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "22px",
          }}>
            <span style={{
              width: 30,
              height: 30,
              border: "2px solid rgba(146,178,255,0.65)",
              borderRadius: "50%",
              flexShrink: 0,
              marginTop: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(232,240,255,0.85))",
              fontSize: "14px",
              color: "#6b8ec8",
              fontWeight: 800,
              lineHeight: 1,
            }}>✓</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              fontWeight: 500,
              color: "#2a2a2a",
              lineHeight: 1.65,
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "auto", flexShrink: 0, width: "100%" }}>
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            fontWeight: 600,
            color: "#444",
            display: "block",
            marginBottom: "8px",
          }}>Ціна</span>
          <div>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(13px, 1.2vw, 16px)",
              fontWeight: 500,
              color: "#999",
              textDecoration: "line-through",
              marginRight: "10px",
            }}>{oldPrice}</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(24px, 2.6vw, 34px)",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.02em",
            }}>{price}</span>
          </div>
        </div>

        <button
          type="button"
          style={{
            background: "linear-gradient(135deg, #9eb6ff 0%, #92B2FF 45%, #7a9eef 100%)",
            border: "none",
            borderRadius: "60px",
            padding: "16px 18px 16px 32px",
            minHeight: "54px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(12px, 1.05vw, 14px)",
            fontWeight: 800,
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            width: "100%",
            boxShadow: "0 4px 20px rgba(146,178,255,.35)",
            transition: "box-shadow .2s, transform .15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 10px 32px rgba(146,178,255,.5)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(146,178,255,.35)";
            e.currentTarget.style.transform = "none";
          }}
        >
          {btnLabel}
          <span style={{
            background: "#fff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <ArrowIcon variant="blue" height={16} />
          </span>
        </button>
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
        padding: "80px 120px 96px",
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large vivid orb — fills bottom half */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1100px, 130vw)",
        height: "min(1100px, 130vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, #7fa8ff 0%, #a8c4ff 22%, #c8d8ff 42%, #dce8ff 58%, #eef4ff 72%, transparent 85%)",
        filter: "blur(32px)",
        opacity: 0.9,
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Secondary smaller orb for richness */}
      <div style={{
        position: "absolute",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(600px, 80vw)",
        height: "min(600px, 80vw)",
        borderRadius: "50%",
        background: "radial-gradient(circle at center, #92b2ff 0%, #b8ccff 40%, transparent 70%)",
        filter: "blur(60px)",
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div className="praktikum-inner" style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(30px, 5.5vw, 68px)",
          fontWeight: 900,
          color: "#111",
          textTransform: "uppercase",
          letterSpacing: ".02em",
          lineHeight: 1,
          margin: "0 0 18px 0",
        }}>
          Практикум «Подорож до себе»
        </h2>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(15px, 1.4vw, 19px)",
          fontWeight: 500,
          color: "#555",
          margin: "0 0 24px 0",
        }}>
          7-денна психологічна програма — почати можна будь-коли
        </p>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(15px, 1.35vw, 18px)",
          fontWeight: 400,
          color: "#333",
          lineHeight: 1.8,
          maxWidth: "680px",
          margin: "0 auto 60px",
        }}>
          Щодня — короткі тексти, запитання й практики. 15–20 хвилин на день,
          які повертають ясність, живість і розуміння, куди рухатися далі.
          Не марафон. Не самооптимізація. М&apos;який вхід у контакт із собою.
        </p>

        <div
          className="praktikum-cards"
          style={{
            display: "flex",
            gap: "28px",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
            maxWidth: "1040px",
            margin: "0 auto",
          }}
        >
          <PrCard
            title={"З підтримкою\nпсихолога"}
            features={PRAKTIKUM_WITH}
            oldPrice="10500 грн"
            price="5400 грн"
            btnLabel="Почати з психологом"
          />
          <PrCard
            title="Самостійний старт"
            features={PRAKTIKUM_SELF}
            oldPrice="4500 грн"
            price="595 грн"
            btnLabel="Почати самостійно"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #практикум {
            padding: 56px 24px 72px !important;
          }
          #практикум .praktikum-cards {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          #практикум .praktikum-card {
            max-width: 100% !important;
            min-height: unset !important;
            padding: 36px 26px 32px !important;
          }
        }
      `}</style>
    </section>
  );
}