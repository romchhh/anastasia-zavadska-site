"use client";

import { useState, useRef } from "react";
import { SERVICES } from "../data/siteData";

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(SERVICES.length - 1, i + 1));

  // Touch
  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { e.preventDefault(); };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 30) next();
    else if (diff < -30) prev();
    startX.current = null;
  };

  // Mouse drag
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
    if (!dragMoved.current) return;
    const diff = startX.current - e.clientX;
    if (diff > 30) next();
    else if (diff < -30) prev();
    startX.current = null;
  };

  return (
    <section id="послуги" style={{ background: "#fff", padding: "72px 0 80px", textAlign: "center", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ padding: "0 48px", marginBottom: "52px" }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 900,
          color: "#111",
          textTransform: "uppercase",
          lineHeight: 1,
          margin: "0 0 16px 0",
        }}>
          Мої послуги
        </h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(15px, 1.4vw, 19px)",
          color: "#444",
          lineHeight: 1.6,
          margin: 0,
        }}>
          Як ми можемо працювати разом<br />
          Усі формати — онлайн, у твоєму темпі та просторі
        </p>
      </div>

      {/* Carousel viewport */}
      <div
        style={{ position: "relative", width: "100%", overflow: "hidden", cursor: "grab", userSelect: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Track — центруємо активну картку */}
        <div style={{
          display: "flex",
          gap: "20px",
          transition: "transform .5s cubic-bezier(.4,0,.2,1)",
          // картка min(480px, 90vw), gap 20px → крок = min(500px, 90vw+20px)
          // центруємо: 50% - (active * крок) - половина_картки
          transform: `translateX(calc(50% - ${active} * min(500px, calc(90vw + 20px)) - min(240px, 45vw)))`,
          willChange: "transform",
          paddingLeft: "0",
        }}>
          {SERVICES.map((s, i) => {
            const isActive = i === active;
            const dist = Math.abs(i - active);
            return (
              <div
                key={s.id}
                onClick={() => { if (!dragMoved.current) setActive(i); }}
                style={{
                  background: isActive ? "#b8ccf0" : "#d8e6f8",
                  borderRadius: "24px",
                  width: "min(480px, 90vw)",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: isActive ? "2.5px solid #8aaad8" : "2.5px solid transparent",
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.7 : 0.4,
                  transform: isActive ? "scale(1)" : "scale(0.93)",
                  transition: "opacity .4s, transform .4s, border-color .3s, background .3s",
                  cursor: isActive ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                {/* Image */}
                <div style={{
                  margin: "14px 14px 0",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: isActive ? "#ccdaf4" : "#e4eef8",
                  aspectRatio: "16/10",
                }}>
                  {s.img && (
                    <img src={s.img} alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isActive ? "22px" : "18px",
                    fontWeight: 900,
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: ".01em",
                    lineHeight: 1.1,
                    margin: "0 0 14px 0",
                    textAlign: "left",
                    transition: "font-size .3s",
                  }}>
                    {s.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "13px",
                    color: "#333",
                    lineHeight: 1.7,
                    textAlign: "left",
                    flex: 1,
                    margin: "0 0 12px 0",
                  }}>
                    {s.desc}
                  </p>

                  {s.extra && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "13px", color: "#555",
                      textAlign: "left", margin: "0 0 10px 0",
                    }}>{s.extra}</p>
                  )}

                  {s.status && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "14px", fontWeight: 700,
                      fontStyle: "italic", color: "#4a74c8",
                      textAlign: "left", margin: "0 0 16px 0",
                    }}>{s.status}</p>
                  )}

                  {s.price && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "20px", fontWeight: 800,
                      color: "#111", textAlign: "left",
                      margin: "0 0 16px 0",
                    }}>{s.price}</p>
                  )}

                  {isActive ? (
                    <button style={{
                      background: "#92B2FF",
                      border: "none",
                      borderRadius: "50px",
                      padding: "14px 14px 14px 28px",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "14px", fontWeight: 800,
                      color: "#fff", cursor: "pointer",
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      textTransform: "uppercase",
                      letterSpacing: ".04em", width: "100%",
                    }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(146,178,255,.45)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                      {s.btnLabel}
                      <span style={{
                        background: "#fff", borderRadius: "50%",
                        width: 36, height: 36,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#92B2FF", fontSize: 18, fontWeight: 900, flexShrink: 0,
                      }}>→</span>
                    </button>
                  ) : (
                    <button style={{
                      background: "transparent",
                      border: "2px solid rgba(100,140,210,0.4)",
                      borderRadius: "50px",
                      padding: "11px 12px 11px 22px",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "12px", fontWeight: 800,
                      color: "#4a74c8", cursor: "pointer",
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      textTransform: "uppercase",
                      letterSpacing: ".04em", width: "100%",
                    }}>
                      {s.btnLabel}
                      <span style={{
                        border: "2px solid rgba(100,140,210,0.4)",
                        borderRadius: "50%", width: 28, height: 28,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#4a74c8", fontSize: 14, flexShrink: 0,
                      }}>→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Left/right fade edges (desktop only — на мобілці прибираємо «миття» країв) */}
        <div
          className="services-edge-fade services-edge-fade-left"
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "120px",
            background: "linear-gradient(to right, #fff 0%, transparent 100%)",
            pointerEvents: "none", zIndex: 2,
          }}
        />
        <div
          className="services-edge-fade services-edge-fade-right"
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "120px",
            background: "linear-gradient(to left, #fff 0%, transparent 100%)",
            pointerEvents: "none", zIndex: 2,
          }}
        />

        {/* Arrow buttons */}
        {active > 0 && (
          <button
            type="button"
            className="services-nav-btn"
            aria-label="Попередня послуга"
            onClick={prev}
            style={{
              position: "absolute",
              left: "clamp(16px, 4vw, 48px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "none",
              border: "1.5px solid #c0d0e8",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#8aa4cc",
              cursor: "pointer",
            }}
          >
            ←
          </button>
        )}
        {active < SERVICES.length - 1 && (
          <button
            type="button"
            className="services-nav-btn"
            aria-label="Наступна послуга"
            onClick={next}
            style={{
              position: "absolute",
              right: "clamp(16px, 4vw, 48px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 3,
              background: "none",
              border: "1.5px solid #c0d0e8",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#8aa4cc",
              cursor: "pointer",
            }}
          >
            →
          </button>
        )}
      </div>

      {/* Dots */}
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", gap: "10px",
        marginTop: "36px",
      }}>
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
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

      <style>{`
        @media (max-width: 768px) {
          .services-edge-fade {
            display: none !important;
          }
          .services-nav-btn {
            background: #fff !important;
            border: 1.5px solid #b8ccf0 !important;
            color: #7a9ae0 !important;
            box-shadow: 0 2px 12px rgba(100, 140, 200, 0.12) !important;
          }
        }
      `}</style>
    </section>
  );
}