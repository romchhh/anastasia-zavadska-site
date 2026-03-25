"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { EDUCATION_DOCUMENTS } from "../data/siteData";

function DiplomaSlide({ doc, onOpen }) {
  const hasImage = Boolean(doc.src);
  return (
    <button
      type="button"
      data-edu-slide
      onClick={onOpen}
      style={{
        flex: "0 0 auto",
        width: "min(200px, 42vw)",
        aspectRatio: "3 / 4",
        borderRadius: "16px",
        background: "#fff",
        border: "none",
        boxShadow: "0 4px 24px rgba(80,120,200,.12)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: hasImage ? 0 : "16px",
        gap: "12px",
        overflow: "hidden",
        scrollSnapAlign: "start",
        transition: "transform .2s, box-shadow .2s",
        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(80,120,200,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(80,120,200,.12)";
      }}
    >
      {doc.src ? (
        <img
          src={doc.src}
          alt={doc.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ) : (
        <>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #e8f0fc, #dce8f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}>📄</div>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "#666",
            lineHeight: 1.35,
          }}>
            {doc.title}
          </span>
        </>
      )}
    </button>
  );
}

const arrowBtnBase = {
  background: "#fff",
  border: "1.5px solid rgba(120,160,220,0.45)",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  color: "#6b8fd4",
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(100,140,200,.1)",
  flexShrink: 0,
};

export default function EducationSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const galleryTouchStartX = useRef(null);

  const updateActiveFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slides = el.querySelectorAll("[data-edu-slide]");
    if (!slides.length) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    let best = 0;
    let bestD = Infinity;
    slides.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const d = Math.abs(cx - centerX);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActiveIndex(best);
  }, []);

  const scrollTrack = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector("[data-edu-slide]");
    const step = slide ? slide.offsetWidth + 16 : 220;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const scrollToIndex = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    const slides = el.querySelectorAll("[data-edu-slide]");
    const slide = slides[i];
    if (slide) {
      slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateActiveFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    updateActiveFromScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const onResize = () => updateActiveFromScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateActiveFromScroll]);

  const galleryCount = EDUCATION_DOCUMENTS.length;
  const goGalleryPrev = useCallback(() => {
    setGalleryIndex((i) => (i - 1 + galleryCount) % galleryCount);
  }, [galleryCount]);
  const goGalleryNext = useCallback(() => {
    setGalleryIndex((i) => (i + 1) % galleryCount);
  }, [galleryCount]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
      else if (e.key === "ArrowLeft") goGalleryPrev();
      else if (e.key === "ArrowRight") goGalleryNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, goGalleryPrev, goGalleryNext]);

  const openModal = useCallback((startIndex = 0) => {
    setGalleryIndex(Math.max(0, Math.min(startIndex, galleryCount - 1)));
    setModalOpen(true);
  }, [galleryCount]);

  const galleryDoc = EDUCATION_DOCUMENTS[galleryIndex];

  return (
    <section
      id="освіта"
      style={{
        background: "#fff",
        padding: "72px 120px 88px",
        boxSizing: "border-box",
      }}
      className="education-section-outer"
    >
      <div
        style={{
          background: "linear-gradient(145deg, #c8daf8 0%, #d8e6fa 42%, #e6eefc 100%)",
          borderRadius: "36px",
          padding: "clamp(32px, 5vw, 56px) clamp(28px, 4vw, 52px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(28px, 4vw, 48px)",
          alignItems: "stretch",
          boxShadow: "0 8px 40px rgba(100,140,200,.1)",
        }}
      >
        {/* Ліва колонка */}
        <div style={{
          flex: "1 1 280px",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "32px",
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(24px, 3.2vw, 36px)",
              fontWeight: 900,
              color: "#111",
              lineHeight: 1.12,
              margin: "0 0 16px 0",
              letterSpacing: "-0.02em",
            }}>
              Освіта та кваліфікація
            </h2>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(14px, 1.25vw, 17px)",
              fontWeight: 500,
              color: "#444",
              lineHeight: 1.65,
              margin: "0 0 28px 0",
            }}>
              Я продовжую вчитися — щоб бути поруч ефективніше
            </p>
            <button
              type="button"
              onClick={() => openModal(0)}
              style={{
                background: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "16px 28px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(11px, 1vw, 13px)",
                fontWeight: 800,
                color: "#5a7fd4",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(255,255,255,.6), 0 2px 12px rgba(80,120,200,.12)",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,255,255,.8), 0 4px 16px rgba(80,120,200,.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,255,255,.6), 0 2px 12px rgba(80,120,200,.12)";
              }}
            >
              Переглянути всі документи
            </button>
          </div>
        </div>

        {/* Карусель дипломів */}
        <div
          className="education-carousel-col"
          style={{
            flex: "1 1 320px",
            minWidth: 0,
            position: "relative",
          }}
        >
          <div className="education-carousel-frame">
            <button
              type="button"
              className="education-arrow-side"
              aria-label="Попередні документи"
              onClick={() => scrollTrack(-1)}
              style={{ ...arrowBtnBase, width: 48, height: 48 }}
            >
              ←
            </button>
            <div
              ref={trackRef}
              className="education-track"
              style={{
                display: "flex",
                gap: "16px",
                overflowX: "auto",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "8px",
                marginRight: "-8px",
                scrollbarWidth: "thin",
                flex: 1,
                minWidth: 0,
              }}
            >
              {EDUCATION_DOCUMENTS.map((doc, i) => (
                <DiplomaSlide key={doc.id} doc={doc} onOpen={() => openModal(i)} />
              ))}
            </div>
            <button
              type="button"
              className="education-arrow-side"
              aria-label="Наступні документи"
              onClick={() => scrollTrack(1)}
              style={{ ...arrowBtnBase, width: 48, height: 48 }}
            >
              →
            </button>
          </div>
          <div className="education-dots-mobile" role="tablist" aria-label="Слайди документів">
            {EDUCATION_DOCUMENTS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Слайд ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                style={{
                  width: activeIndex === i ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeIndex === i ? "#6b8fd4" : "rgba(107,143,212,0.35)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width .25s ease, background .2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Галерея дипломів: одне фото, гортання стрілками / свайпом / клавіатурою */}
      {modalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="education-gallery-title"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(12, 18, 32, 0.88)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(12px, 4vw, 24px)",
              boxSizing: "border-box",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(false);
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "min(920px, 100%)",
                height: "min(88vh, 900px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexShrink: 0,
                }}
              >
                <p
                  id="education-gallery-title"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                    letterSpacing: ".06em",
                  }}
                >
                  {galleryIndex + 1} / {galleryCount}
                </p>
                <button
                  type="button"
                  aria-label="Закрити галерею"
                  onClick={() => setModalOpen(false)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "26px",
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  position: "relative",
                  flex: 1,
                  width: "100%",
                  minHeight: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <button
                  type="button"
                  aria-label="Попередній документ"
                  onClick={goGalleryPrev}
                  style={{
                    ...arrowBtnBase,
                    display: "inline-flex",
                    width: 48,
                    height: 48,
                    background: "rgba(255,255,255,0.95)",
                    border: "1.5px solid rgba(200,210,230,0.5)",
                    flexShrink: 0,
                  }}
                >
                  ←
                </button>

                <div
                  style={{
                    flex: 1,
                    height: "100%",
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    touchAction: "manipulation",
                  }}
                  onTouchStart={(e) => {
                    galleryTouchStartX.current = e.touches[0].clientX;
                  }}
                  onTouchEnd={(e) => {
                    if (galleryTouchStartX.current === null) return;
                    const dx = e.changedTouches[0].clientX - galleryTouchStartX.current;
                    galleryTouchStartX.current = null;
                    if (dx > 56) goGalleryPrev();
                    else if (dx < -56) goGalleryNext();
                  }}
                >
                  {galleryDoc?.src ? (
                    <img
                      src={galleryDoc.src}
                      alt={galleryDoc.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "min(78vh, 820px)",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "12px",
                        boxShadow: "0 12px 48px rgba(0,0,0,0.35)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                      draggable={false}
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "15px",
                        textAlign: "center",
                        padding: "24px",
                      }}
                    >
                      Немає зображення
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  aria-label="Наступний документ"
                  onClick={goGalleryNext}
                  style={{
                    ...arrowBtnBase,
                    display: "inline-flex",
                    width: 48,
                    height: 48,
                    background: "rgba(255,255,255,0.95)",
                    border: "1.5px solid rgba(200,210,230,0.5)",
                    flexShrink: 0,
                  }}
                >
                  →
                </button>
              </div>

              <div
                role="tablist"
                aria-label="Слайди галереї"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  flexShrink: 0,
                  paddingTop: "4px",
                }}
              >
                {EDUCATION_DOCUMENTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={galleryIndex === i}
                    aria-label={`Документ ${i + 1}`}
                    onClick={() => setGalleryIndex(i)}
                    style={{
                      width: galleryIndex === i ? 22 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: galleryIndex === i ? "#fff" : "rgba(255,255,255,0.35)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "width .25s ease, background .2s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
      )}

      <style>{`
        .education-carousel-frame {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .education-arrow-side {
          display: inline-flex;
        }
        .education-dots-mobile {
          display: none;
        }
        @media (max-width: 768px) {
          .education-section-outer {
            padding: 56px 40px 72px !important;
          }
          .education-carousel-frame {
            gap: 10px;
          }
          .education-arrow-side {
            width: 44px !important;
            height: 44px !important;
            font-size: 18px !important;
          }
          .education-dots-mobile {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-top: 14px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}
