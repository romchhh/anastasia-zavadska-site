"use client";

import { User } from "lucide-react";
import { useState, useRef, useMemo, useSyncExternalStore, useLayoutEffect, useCallback } from "react";
import { REVIEWS, PRAKTIKUM_JOURNEY_URL } from "../data/siteData";
import { ArrowIcon } from "./ArrowIcon";
import CtaPillButton from "./CtaPillButton";
import { PAGE_GUTTER_X, SECTION_INTRO_TITLE } from "./sectionIntroStyles";

/** Як у каруселі послуг: той самий крок і візуальна ієрархія карток */
const CARD_W = "min(360px, 82vw)";
/** Мобільна: майже на всю ширину вікна (секція без бокового padding — див. CSS), мінус стрілки та невеликий відступ */
/** Менший «відступ від країв» — ширша картка; стрілки лишаються в safe-area */
const CARD_W_MOBILE = "min(520px, calc(100vw - 56px - 16px))";
const CARD_GAP = 18;

function useReviewsCarouselMobile() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(max-width: 768px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(max-width: 768px)").matches,
    () => false
  );
}

function ReviewCard({ label, text, isActive, dist, onSelect, cardWidth = CARD_W, isMobileLayout = false }) {
  const cardBg = isActive ? "#A3BEFF" : "#C5D6FF";
  const cardBorder = isActive
    ? "2px solid rgba(255,255,255,0.65)"
    : "2px solid rgba(255,255,255,0.45)";
  /** На мобільній підпис лишаємо в один ряд біля іконки; на десктопі активна картка — по центру */
  const headerJustify = isMobileLayout ? "flex-start" : isActive ? "center" : "flex-start";
  const labelTextAlign = isMobileLayout ? "left" : isActive ? "center" : "left";
  const bodyTextAlign = isMobileLayout ? "left" : isActive ? "center" : "left";
  return (
    <div
      data-review-card
      onClick={onSelect}
      style={{
        background: cardBg,
        borderRadius: "32px",
        border: cardBorder,
        padding: "28px 26px 32px",
        width: cardWidth,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "260px",
        boxSizing: "border-box",
        boxShadow: "none",
        opacity: dist === 0 ? 1 : dist === 1 ? 0.88 : 0.5,
        transform: isActive ? "scale(1)" : "scale(0.93)",
        transition: "opacity .4s, transform .4s, border-color .3s, background .3s",
        cursor: isActive ? "default" : "pointer",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          width: "100%",
          justifyContent: headerJustify,
        }}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 2px 10px rgba(80,110,160,0.12)",
        }}>
          <User size={22} strokeWidth={2} color="#7a9ae0" aria-hidden />
        </div>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(10px, 2.4vw, 12px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            lineHeight: 1.25,
            textAlign: labelTextAlign,
            flex: isMobileLayout ? "1 1 auto" : undefined,
            minWidth: isMobileLayout ? 0 : undefined,
          }}
        >
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
        textAlign: bodyTextAlign,
        flex: 1,
      }}>
        {text}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  const n = REVIEWS.length;
  /** Три копії для безшовного кола: індекси n .. 2n-1 — «середня» третина */
  const loopReviews = useMemo(() => [...REVIEWS, ...REVIEWS, ...REVIEWS], []);
  const initialSlide = n + Math.floor((n - 1) / 2);
  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const [noTrackTransition, setNoTrackTransition] = useState(false);
  const slideIndexRef = useRef(initialSlide);
  slideIndexRef.current = slideIndex;

  const startX = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);

  const activeMod = ((slideIndex % n) + n) % n;

  const prev = () => setSlideIndex((i) => i - 1);
  const next = () => setSlideIndex((i) => i + 1);

  const handleTrackTransitionEnd = useCallback(
    (e) => {
      if (e.propertyName !== "transform") return;
      const s = slideIndexRef.current;
      if (s >= 2 * n) {
        setNoTrackTransition(true);
        setSlideIndex(s - n);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setNoTrackTransition(false));
        });
      } else if (s < n) {
        setNoTrackTransition(true);
        setSlideIndex(s + n);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setNoTrackTransition(false));
        });
      }
    },
    [n]
  );

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
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

  const isMobileCarousel = useReviewsCarouselMobile();
  const cardWidth = isMobileCarousel ? CARD_W_MOBILE : CARD_W;
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [mobileTrackX, setMobileTrackX] = useState(null);

  const updateMobileCarouselTransform = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 768px)").matches) {
      setMobileTrackX(null);
      return;
    }
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const firstCard = track.querySelector("[data-review-card]");
    if (!firstCard) return;
    const vw = viewport.clientWidth;
    const cw = firstCard.offsetWidth;
    const x = vw / 2 - slideIndex * (cw + CARD_GAP) - cw / 2;
    setMobileTrackX(Math.round(x * 100) / 100);
  }, [slideIndex]);

  useLayoutEffect(() => {
    updateMobileCarouselTransform();
  }, [updateMobileCarouselTransform]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof window === "undefined") return;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => updateMobileCarouselTransform());
    });
    ro.observe(viewport);
    const onOrient = () => updateMobileCarouselTransform();
    window.addEventListener("orientationchange", onOrient);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", onOrient);
    };
  }, [updateMobileCarouselTransform]);

  const reviewsTrackTransform =
    isMobileCarousel && mobileTrackX !== null
      ? `translateX(${mobileTrackX}px)`
      : `translateX(calc(50vw - ${PAGE_GUTTER_X} - ${slideIndex} * (${CARD_W} + ${CARD_GAP}px) - (${CARD_W}) / 2))`;

  const trackTransition = noTrackTransition
    ? "none"
    : "transform .5s cubic-bezier(.4,0,.2,1)";

  return (
    <section
      id="відгуки"
      style={{
        marginTop: "clamp(-48px, -6vw, -36px)",
        padding: `clamp(88px, 10vw, 118px) ${PAGE_GUTTER_X} clamp(56px, 8vw, 80px)`,
        overflow: "visible",
        boxSizing: "border-box",
        background: "transparent",
      }}
    >
      <div style={{
        padding: 0,
        marginBottom: "28px",
        boxSizing: "border-box",
      }}
        className="reviews-header"
      >
        <h2
          style={{
            ...SECTION_INTRO_TITLE,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: "auto",
            textAlign: "left",
          }}
        >
          Живі усвідомлення учасниць
        </h2>
      </div>

      <div
        ref={viewportRef}
        className="reviews-carousel-viewport"
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
          ref={trackRef}
          className="reviews-carousel-track"
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            transition: trackTransition,
            transform: reviewsTrackTransform,
            willChange: "transform",
            paddingLeft: 0,
          }}
        >
          {loopReviews.map((r, i) => {
            const isActive = i === slideIndex;
            const dist = Math.abs(i - slideIndex);
            return (
              <ReviewCard
                key={`${r.id}-loop-${i}`}
                label={r.label}
                text={r.text}
                isActive={isActive}
                dist={dist}
                cardWidth={cardWidth}
                isMobileLayout={isMobileCarousel}
                onSelect={() => {
                  if (!dragMoved.current) setSlideIndex(i);
                }}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Попередній відгук"
          className="reviews-nav-btn reviews-nav-btn--overlay reviews-carousel-arrow reviews-carousel-arrow--prev"
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
        <button
          type="button"
          onClick={next}
          aria-label="Наступний відгук"
          className="reviews-nav-btn reviews-nav-btn--overlay reviews-carousel-arrow reviews-carousel-arrow--next"
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
      </div>

      <div className="reviews-footer">
        <div className="reviews-dots-toolbar" style={{ marginTop: "24px" }}>
          <div className="reviews-dots-arrow-slot reviews-dots-arrow-slot--left">
            <button
              type="button"
              onClick={prev}
              aria-label="Попередній відгук"
              className="reviews-nav-mobile"
            >
              <ArrowIcon variant="blue" direction="left" height={16} />
            </button>
          </div>
          <div
            className="reviews-dots-inner reviews-dots"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {REVIEWS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSlideIndex(n + i)}
                aria-label={`Відгук ${i + 1}`}
                style={{
                  width: activeMod === i ? 28 : 10,
                  height: 10,
                  borderRadius: "5px",
                  background: activeMod === i ? "#92B2FF" : "#c8d8f0",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width .35s cubic-bezier(.4,0,.2,1), background .3s",
                }}
              />
            ))}
          </div>
          <div className="reviews-dots-arrow-slot reviews-dots-arrow-slot--right">
            <button
              type="button"
              onClick={next}
              aria-label="Наступний відгук"
              className="reviews-nav-mobile"
            >
              <ArrowIcon variant="blue" height={16} />
            </button>
          </div>
        </div>
        <div className="reviews-practicum-cta-wrap">
          <CtaPillButton
            href={PRAKTIKUM_JOURNEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="compactSolid"
          >
            Ознайомитися з програмою
          </CtaPillButton>
        </div>
      </div>

      <style>{`
        .reviews-footer {
          margin-top: 28px;
          padding: 0;
          box-sizing: border-box;
          background: transparent;
        }
        #відгуки .reviews-header {
          background: #fff;
        }
        #відгуки .reviews-carousel-viewport {
          background: #fff;
        }
        #відгуки .reviews-dots-toolbar {
          background: #fff;
        }
        .reviews-dots-toolbar {
          display: block;
        }
        .reviews-dots-arrow-slot {
          display: none;
        }
        .reviews-nav-mobile {
          display: none;
        }
        .reviews-practicum-cta-wrap {
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 3;
          padding-bottom: clamp(12px, 2.2vw, 22px);
          margin-bottom: clamp(-18px, -2.5vw, -10px);
        }
        @media (min-width: 769px) {
          .reviews-carousel-viewport .reviews-nav-btn--overlay {
            background: #fff !important;
            border: 1.5px solid #b8ccf0 !important;
            color: #7a9ae0 !important;
            box-shadow: none !important;
          }
        }
        @media (max-width: 768px) {
          #відгуки {
            padding-top: clamp(28px, 5vw, 44px) !important;
            padding-bottom: clamp(40px, 7vw, 56px) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            overflow: visible !important;
            background: transparent !important;
          }
          .reviews-header {
            margin-bottom: 14px !important;
            padding-left: ${PAGE_GUTTER_X} !important;
            padding-right: ${PAGE_GUTTER_X} !important;
            box-sizing: border-box;
          }
          .reviews-footer {
            margin-top: 16px !important;
            padding-left: ${PAGE_GUTTER_X} !important;
            padding-right: ${PAGE_GUTTER_X} !important;
            box-sizing: border-box;
          }
          .reviews-carousel-viewport {
            min-height: 240px !important;
          }
          /* Стрілки по боках карток, по вертикалі по центру в’юпорту */
          .reviews-carousel-viewport .reviews-nav-btn--overlay {
            display: flex !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
          }
          .reviews-carousel-viewport .reviews-carousel-arrow--prev {
            left: max(0px, env(safe-area-inset-left, 0px)) !important;
          }
          .reviews-carousel-viewport .reviews-carousel-arrow--next {
            right: max(0px, env(safe-area-inset-right, 0px)) !important;
          }
          .reviews-dots-toolbar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0;
            margin-top: 18px !important;
            margin-bottom: 14px !important;
          }
          .reviews-dots {
            margin-bottom: 0 !important;
            flex: 0 1 auto;
          }
          .reviews-dots-arrow-slot {
            display: none !important;
          }
          .reviews-nav-mobile {
            display: none !important;
          }
          .reviews-nav-btn {
            background: #fff !important;
            border: 1.5px solid #b8ccf0 !important;
            color: #7a9ae0 !important;
            box-shadow: none !important;
          }
          .reviews-practicum-cta-wrap {
            margin-top: 10px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
