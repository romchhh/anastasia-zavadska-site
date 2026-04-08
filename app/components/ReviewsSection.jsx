"use client";

import { useState, useRef } from "react";
import { REVIEWS, PRAKTIKUM_JOURNEY_URL } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";
import CtaPillButton from "./CtaPillButton";
import { SECTION_INTRO_TITLE } from "./sectionIntroStyles";

const CARD_W = "min(360px, 82vw)";
const STEP = "min(380px, calc(82vw + 20px))";
const HALF = "min(180px, 41vw)";

function ReviewCard({ label, text, isActive, dist, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: "#94AFFF",
        borderRadius: "20px",
        padding: "28px 26px 32px",
        width: CARD_W,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "260px",
        boxSizing: "border-box",
        boxShadow: isActive
          ? "0 12px 40px rgba(100,130,220,.35)"
          : "0 6px 24px rgba(100,130,220,.2)",
        opacity: dist === 0 ? 1 : dist === 1 ? 0.72 : 0.42,
        transform: isActive ? "scale(1)" : "scale(0.94)",
        transition: "opacity .4s, transform .4s, box-shadow .35s",
        cursor: isActive ? "default" : "pointer",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <img
            src="/practicum-participant.png"
            alt=""
            width={24}
            height={24}
            style={{
              width: 24,
              height: 24,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        <span style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(10px, 2.4vw, 12px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          lineHeight: 1.25,
        }}>
          {label}
        </span>
      </div>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "clamp(14px, 1.35vw, 16px)",
        fontWeight: 500,
        color: "#fff",
        lineHeight: 1.65,
        margin: 0,
        textAlign: "left",
        flex: 1,
      }}>
        {text}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(REVIEWS.length - 1, i + 1));

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    dragMoved.current = false;
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (startX.current !== null) {
      const dx = Math.abs(e.touches[0].clientX - startX.current);
      if (dx > 12) dragMoved.current = true;
    }
  };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 30) next();
    else if (diff < -30) prev();
    startX.current = null;
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
    dragMoved.current = false;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    if (Math.abs(e.clientX - startX.current) > 5) dragMoved.current = true;
  };
  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragMoved.current) {
      const diff = startX.current - e.clientX;
      if (diff > 30) next();
      else if (diff < -30) prev();
    }
    startX.current = null;
  };

  return (
    <section
      id="відгуки"
      style={{
        background: "#fff",
        padding: "80px 0 88px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        padding: "0 120px",
        marginBottom: "48px",
        boxSizing: "border-box",
      }}
        className="reviews-header"
      >
        <h2 style={{
          ...SECTION_INTRO_TITLE,
          margin: 0,
          textAlign: "left",
        }}>
          Живі усвідомлення учасниць
        </h2>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
          minHeight: "280px",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            transition: "transform .5s cubic-bezier(.4,0,.2,1)",
            transform: `translateX(calc(50% - ${active} * ${STEP} - ${HALF}))`,
            willChange: "transform",
          }}
        >
          {REVIEWS.map((r, i) => {
            const isActive = i === active;
            const dist = Math.abs(i - active);
            return (
              <ReviewCard
                key={r.id}
                label={r.label}
                text={r.text}
                isActive={isActive}
                dist={dist}
                onSelect={() => {
                  if (!dragMoved.current) setActive(i);
                }}
              />
            );
          })}
        </div>

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "100px",
          background: "linear-gradient(to right, #fff 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100px",
          background: "linear-gradient(to left, #fff 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }} />

        {active > 0 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Попередній відгук"
            style={{
              position: "absolute",
              left: "clamp(16px, 4vw, 48px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "#fff",
              border: "1.5px solid #b8ccf0",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#7a9ae0",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(100,140,200,.12)",
            }}
          >
            <ArrowIcon variant="blue" direction="left" height={16} />
          </button>
        )}
        {active < REVIEWS.length - 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Наступний відгук"
            style={{
              position: "absolute",
              right: "clamp(16px, 4vw, 48px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "#fff",
              border: "1.5px solid #b8ccf0",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#7a9ae0",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(100,140,200,.12)",
            }}
          >
            <ArrowIcon variant="blue" height={16} />
          </button>
        )}
      </div>

      <div className="reviews-footer">
        <div
          className="reviews-dots"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "clamp(20px, 3vw, 28px)",
          }}
        >
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Відгук ${i + 1}`}
              style={{
                width: active === i ? 28 : 10,
                height: 10,
                borderRadius: "5px",
                background: active === i ? "#92B2FF" : "#c8d8f0",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width .35s cubic-bezier(.4,0,.2,1), background .3s",
              }}
            />
          ))}
        </div>
        <div className="reviews-practicum-cta-wrap">
          <CtaPillButton
            href={PRAKTIKUM_JOURNEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="compact"
          >
            Детальніше ознайомитися з програмою
          </CtaPillButton>
        </div>
      </div>

      <style>{`
        .reviews-footer {
          margin-top: 36px;
          padding: 0 120px;
          box-sizing: border-box;
        }
        .reviews-practicum-cta-wrap {
          display: flex;
          justify-content: flex-end;
        }
        @media (max-width: 768px) {
          .reviews-header {
            padding: 0 40px !important;
            margin-bottom: 36px !important;
          }
          .reviews-footer {
            padding: 0 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
