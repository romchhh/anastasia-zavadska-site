"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";

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
    <section
      id="послуги"
      style={{
        background: "#fff",
        padding: "72px 0 80px",
        textAlign: "center",
        overflow: "hidden",
        scrollMarginTop: "88px",
      }}
    >

      {/* Header */}
      <div style={{ padding: "0 48px", marginBottom: "52px" }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 900,
          color: "#111",
          textTransform: "uppercase",
          lineHeight: 1,
          margin: "0 0 20px 0",
          letterSpacing: ".02em",
        }}>
          Мої послуги
        </h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(16px, 1.5vw, 22px)",
          fontWeight: 600,
          color: "#111",
          lineHeight: 1.45,
          margin: "0 0 10px 0",
        }}>
          Як ми можемо працювати разом
        </p>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(14px, 1.25vw, 18px)",
          fontWeight: 500,
          color: "#444",
          lineHeight: 1.55,
          margin: 0,
          maxWidth: "640px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
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
            const cardBg = isActive ? "#A3BEFF" : "#C5D6FF";
            const cardBorder = isActive
              ? "2px solid rgba(255,255,255,0.65)"
              : "2px solid rgba(255,255,255,0.45)";
            const accentBlue = "#A3BEFF";
            const titleSize = isActive ? "clamp(20px, 2.2vw, 26px)" : "clamp(16px, 1.8vw, 20px)";
            const bodyFont = isActive ? "13px" : "12px";
            const cardPad = isActive ? "clamp(20px, 4vw, 28px)" : "clamp(16px, 3.5vw, 22px)";

            return (
              <div
                key={s.id}
                onClick={() => { if (!dragMoved.current) setActive(i); }}
                style={{
                  background: cardBg,
                  borderRadius: "36px",
                  width: "min(480px, 90vw)",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: cardBorder,
                  boxSizing: "border-box",
                  padding: cardPad,
                  boxShadow: isActive ? "0 12px 40px rgba(100, 130, 210, 0.28)" : "none",
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.88 : 0.5,
                  transform: isActive ? "scale(1)" : "scale(0.93)",
                  transition: "opacity .4s, transform .4s, border-color .3s, background .3s, box-shadow .3s",
                  cursor: isActive ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                {/* Фото ~40% висоти картки: широкий кадр 2:1 */}
                <div style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.25)",
                  aspectRatio: isActive ? "2 / 1" : "2.1 / 1",
                  width: "100%",
                  flexShrink: 0,
                  marginBottom: isActive ? "18px" : "14px",
                }}>
                  {s.img && (
                    <img src={s.img} alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  )}
                </div>

                {/* Контент: зображення → заголовок → опис → тривалість → ціна → кнопка */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minHeight: 0,
                }}>
                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: titleSize,
                    fontWeight: 900,
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: ".03em",
                    lineHeight: 1.06,
                    margin: "0 0 12px 0",
                    textAlign: "left",
                    transition: "font-size .3s",
                  }}>
                    {s.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: bodyFont,
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1.55,
                    textAlign: "left",
                    margin: "0 0 12px 0",
                  }}>
                    {s.desc}
                  </p>

                  {s.extra && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: bodyFont,
                      fontWeight: 400,
                      color: "#FFFFFF",
                      textAlign: "left",
                      margin: "0 0 10px 0",
                      lineHeight: 1.45,
                    }}>{s.extra}</p>
                  )}

                  {s.status && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: bodyFont,
                      fontWeight: 600,
                      fontStyle: "italic",
                      color: "#3d62d8",
                      textAlign: "left",
                      margin: "0 0 12px 0",
                    }}>{s.status}</p>
                  )}

                  {s.priceLine && s.priceEmphasis ? (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#FFFFFF",
                      textAlign: "left",
                      margin: "0 0 20px 0",
                      lineHeight: 1.2,
                    }}>
                      <span style={{ fontSize: bodyFont, fontWeight: 600 }}>{s.priceLine} </span>
                      <span style={{
                        fontSize: isActive ? "clamp(24px, 3vw, 28px)" : "clamp(18px, 2.2vw, 22px)",
                        fontWeight: 800,
                      }}>{s.priceEmphasis}</span>
                    </p>
                  ) : s.price ? (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: isActive ? "clamp(24px, 3vw, 28px)" : "clamp(18px, 2.2vw, 22px)",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      textAlign: "left",
                      margin: "0 0 20px 0",
                    }}>{s.price}</p>
                  ) : null}

                  {s.note && (
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#FFFFFF",
                      lineHeight: 1.55,
                      textAlign: "left",
                      margin: "0 0 18px 0",
                    }}>
                      {s.note}
                    </p>
                  )}

                  {isActive ? (
                    <Link
                      href={`/poslugy/${s.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: "#FFFFFF",
                        border: "none",
                        borderRadius: "999px",
                        padding: "16px 32px",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(13px, 1.4vw, 15px)",
                        fontWeight: 800,
                        color: accentBlue,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                        width: "100%",
                        maxWidth: "100%",
                        marginTop: "auto",
                        textDecoration: "none",
                        boxSizing: "border-box",
                        boxShadow: "0 4px 20px rgba(255,255,255,0.35)",
                        transition: "box-shadow .2s ease, transform .2s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,.12)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,255,255,0.35)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <span>{s.btnLabel}</span>
                      <ArrowIcon variant="blue" height={20} />
                    </Link>
                  ) : (
                    <Link
                      href={`/poslugy/${s.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="services-card-btn-inactive"
                      style={{
                        background: "transparent",
                        border: "2px solid rgba(255,255,255,0.9)",
                        borderRadius: "50px",
                        padding: "12px 12px 12px 18px",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        textTransform: "uppercase",
                        letterSpacing: ".04em",
                        width: "100%",
                        textDecoration: "none",
                        boxSizing: "border-box",
                        minHeight: "52px",
                      }}
                    >
                      <span
                        style={{
                          flex: 1,
                          minWidth: 0,
                          lineHeight: 1.3,
                          textAlign: "left",
                          whiteSpace: "normal",
                          hyphens: "auto",
                        }}
                      >
                        {s.btnLabel}
                      </span>
                      <span style={{
                        border: "2px solid rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <ArrowIcon variant="white" height={11} />
                      </span>
                    </Link>
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
            <ArrowIcon variant="blue" direction="left" height={16} />
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
            <ArrowIcon variant="blue" height={16} />
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
        .services-card-btn-inactive:hover {
          background: rgba(255,255,255,0.12) !important;
        }
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