"use client";

import { FileText } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { EDUCATION_DOCUMENTS } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";
import { PAGE_GUTTER_X, SECTION_INTRO_LEAD, SECTION_TITLE_MAX_WIDTH } from "./sectionIntroStyles";

function DiplomaSlide({ doc, onOpen }) {
  const hasImage = Boolean(doc.src);
  return (
    <button
      type="button"
      data-edu-slide
      onClick={onOpen}
      style={{
        flex: "0 0 auto",
        width: "min(280px, 42vw)",
        aspectRatio: "3 / 4",
        borderRadius: "20px",
        background: "#fff",
        border: "none",
        boxShadow: "0 6px 28px rgba(80, 110, 160, 0.14)",
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
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(80, 110, 160, 0.14)";
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
            borderRadius: "20px",
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
            color: "#5a7bc4",
          }}>
            <FileText size={26} strokeWidth={1.85} aria-hidden />
          </div>
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

const ACCENT = "#6391FF";

const arrowBtnBase = {
  background: "#fff",
  border: `1.5px solid ${ACCENT}`,
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 2px 12px rgba(99, 145, 255, 0.18)",
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
    const step = slide ? slide.offsetWidth + 20 : 300;
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
        padding: `clamp(40px, 5vw, 68px) ${PAGE_GUTTER_X} clamp(48px, 6.5vw, 80px)`,
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
        marginTop: "clamp(-14px, -2vw, -8px)",
      }}
      className="education-section-outer"
    >
      <div
        className="education-panel"
        style={{
          background: "#D6E0FF",
          borderRadius: "clamp(40px, 5vw, 56px)",
          padding:
            "clamp(38px, 5vw, 58px) clamp(28px, 3.5vw, 44px) clamp(38px, 5vw, 58px) clamp(40px, 5.5vw, 76px)",
          display: "grid",
          gridTemplateColumns: "minmax(260px, min(34vw, 380px)) minmax(0, 1fr)",
          gap: "clamp(28px, 4vw, 52px)",
          alignItems: "center",
          boxShadow: "0 16px 48px rgba(90, 110, 180, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.55)",
          boxSizing: "border-box",
        }}
      >
        {/* Ліва колонка: текст, CTA, стрілки */}
        <div
          className="education-panel-text"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0,
            minWidth: 0,
          }}
        >
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 900,
              color: "#111",
              lineHeight: 1.1,
              marginTop: 0,
              marginBottom: "clamp(14px, 2vw, 20px)",
              marginLeft: 0,
              marginRight: "auto",
              letterSpacing: "-0.02em",
              width: "100%",
              maxWidth: SECTION_TITLE_MAX_WIDTH,
              boxSizing: "border-box",
            }}
          >
            Освіта та кваліфікація
          </h2>
          <p
            className="education-panel-lead"
            style={{
              ...SECTION_INTRO_LEAD,
              margin: "0 0 clamp(24px, 3vw, 32px) 0",
              maxWidth: SECTION_TITLE_MAX_WIDTH,
              textAlign: "left",
            }}
          >
            Я продовжую вчитися — щоб бути поруч ефективніше
          </p>
          <button
            type="button"
            onClick={() => openModal(0)}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "15px 32px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(11px, 1.05vw, 13px)",
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(255,255,255,.85), 0 4px 20px rgba(99,145,255,.15)",
              transition: "transform .2s, box-shadow .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,255,255,.95), 0 6px 24px rgba(99,145,255,.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(255,255,255,.85), 0 4px 20px rgba(99,145,255,.15)";
            }}
          >
            Переглянути всі документи
          </button>
          <div
            className="education-nav-arrows"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              marginTop: "clamp(24px, 3.5vw, 36px)",
            }}
          >
            <button
              type="button"
              className="education-arrow-side education-arrow-inline"
              aria-label="Попередні документи"
              onClick={() => scrollTrack(-1)}
              style={{ ...arrowBtnBase, width: 52, height: 52 }}
            >
              <ArrowIcon variant="blue" direction="left" height={18} />
            </button>
            <button
              type="button"
              className="education-arrow-side education-arrow-inline"
              aria-label="Наступні документи"
              onClick={() => scrollTrack(1)}
              style={{ ...arrowBtnBase, width: 52, height: 52 }}
            >
              <ArrowIcon variant="blue" height={18} />
            </button>
          </div>
        </div>

        {/* Карусель дипломів */}
        <div
          className="education-carousel-col"
          style={{
            minWidth: 0,
            position: "relative",
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="education-carousel-frame">
            <div
              ref={trackRef}
              className="education-track"
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "10px",
                marginRight: 0,
                scrollbarWidth: "thin",
                width: "100%",
                minHeight: "min(52vw, 420px)",
              }}
            >
              {EDUCATION_DOCUMENTS.map((doc, i) => (
                <DiplomaSlide key={doc.id} doc={doc} onOpen={() => openModal(i)} />
              ))}
            </div>
          </div>
          <div className="education-mobile-dots-toolbar">
            <div className="education-dots-arrow-slot education-dots-arrow-slot--left">
              {activeIndex > 0 ? (
                <button
                  type="button"
                  className="education-carousel-nav-mobile"
                  aria-label="Попередні документи"
                  onClick={() => scrollTrack(-1)}
                  style={{ ...arrowBtnBase, width: 52, height: 52, display: "inline-flex" }}
                >
                  <ArrowIcon variant="blue" direction="left" height={18} />
                </button>
              ) : null}
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
            <div className="education-dots-arrow-slot education-dots-arrow-slot--right">
              {activeIndex < EDUCATION_DOCUMENTS.length - 1 ? (
                <button
                  type="button"
                  className="education-carousel-nav-mobile"
                  aria-label="Наступні документи"
                  onClick={() => scrollTrack(1)}
                  style={{ ...arrowBtnBase, width: 52, height: 52, display: "inline-flex" }}
                >
                  <ArrowIcon variant="blue" height={18} />
                </button>
              ) : null}
            </div>
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
                maxWidth: SECTION_TITLE_MAX_WIDTH,
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
                  <ArrowIcon variant="blue" direction="left" height={16} />
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
                  <ArrowIcon variant="blue" height={16} />
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
          display: block;
          width: 100%;
          min-width: 0;
        }
        .education-arrow-side {
          display: inline-flex;
        }
        .education-mobile-dots-toolbar {
          display: none;
        }
        .education-dots-mobile {
          display: none;
        }
        .education-dots-arrow-slot {
          display: none;
        }
        @media (max-width: 968px) {
          .education-panel {
            grid-template-columns: 1fr !important;
            padding: clamp(28px, 6.5vw, 40px) clamp(24px, 5vw, 36px) !important;
            gap: clamp(20px, 4vw, 28px) !important;
          }
          .education-panel-text {
            max-width: 100%;
          }
          .education-nav-arrows {
            margin-top: clamp(18px, 4vw, 28px) !important;
          }
        }
        @media (max-width: 768px) {
          .education-panel-lead {
            font-size: clamp(16px, 2.75vw, 22px) !important;
          }
          .education-section-outer {
            padding: 28px clamp(14px, 4vw, 24px) 40px !important;
          }
          .education-nav-arrows {
            display: none !important;
          }
          .education-arrow-side.education-arrow-inline {
            width: 48px !important;
            height: 48px !important;
          }
          .education-mobile-dots-toolbar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 14px;
          }
          .education-dots-arrow-slot {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 52px;
            width: 52px;
            min-height: 52px;
          }
          .education-dots-mobile {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            flex: 0 1 auto;
          }
        }
      `}</style>
    </section>
  );
}
