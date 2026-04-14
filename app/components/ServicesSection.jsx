"use client";

import { useState, useRef, useSyncExternalStore, useLayoutEffect, useCallback } from "react";
import { SERVICES } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";
import { ArrowIcon } from "./ArrowIcon";
import {
  PAGE_GUTTER_X,
  SECTION_INTRO_LEAD,
  SECTION_INTRO_TITLE,
  SECTION_SCROLL_MARGIN_TOP,
  SECTION_TITLE_MAX_WIDTH,
} from "./sectionIntroStyles";

/** Повний опис на картці лише для індивідуальної сесії; група/бранчі — формат, ціна чи статус на сторінці послуги */
function showCardDescription(service) {
  return service.id === SERVICES[0].id;
}

/**
 * Порядок карток у каруселі (індекси в SERVICES):
 * зліва бранчі, по центру індивідуальна сесія, справа група —
 * щоб на десктопі при завантаженні з обох боків були «сусідні» картки.
 */
const SERVICES_CAROUSEL_ORDER = [2, 0, 1];

/** Десктоп: трохи ширше за попередній 0.765, досі вужче за повний 0.85 */
const SERVICE_CARD_DESKTOP_SCALE = 0.81;
const SERVICE_CARD_W = `min(calc(522px * ${SERVICE_CARD_DESKTOP_SCALE}), calc(90vw * ${SERVICE_CARD_DESKTOP_SCALE}))`;
const SERVICE_CARD_GAP = 18;
/**
 * Мобільна: одна картка у в’юпорті — ширина ≈ viewport мінус відстань між слайдами,
 * щоб сусідні картки ховалися за overflow (центр лише активна).
 */
/** Трохи ширша картка на мобільному — менший «відступ» від країв вікна */
const SERVICE_CARD_W_MOBILE = "min(522px, calc(100vw - 28px))";

function useServicesCarouselMobile() {
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

export default function ServicesSection() {
  const orderedServices = SERVICES_CAROUSEL_ORDER.map((idx) => SERVICES[idx]);
  const n = orderedServices.length;
  /** Старт по центру = індивідуальна сесія */
  const [active, setActive] = useState(1);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);

  const prev = () => setActive((i) => (i - 1 + n) % n);
  const next = () => setActive((i) => (i + 1) % n);

  const isMobileCarousel = useServicesCarouselMobile();
  const serviceCardW = isMobileCarousel ? SERVICE_CARD_W_MOBILE : SERVICE_CARD_W;
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  /** Піксельний translate на мобільній (calc(100vw) і scale на картках давали зсув) */
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
    const firstCard = track.querySelector("[data-service-card]");
    if (!firstCard) return;
    const vw = viewport.clientWidth;
    /** offsetWidth — ширина в макеті; getBoundingClientRect() змінюється через scale(0.93) */
    const cardW = firstCard.offsetWidth;
    const gap = SERVICE_CARD_GAP;
    const x = vw / 2 - active * (cardW + gap) - cardW / 2;
    setMobileTrackX(Math.round(x * 100) / 100);
  }, [active]);

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

  const servicesTrackTransform =
    isMobileCarousel && mobileTrackX !== null
      ? `translateX(${mobileTrackX}px)`
      : `translateX(calc(50vw - ${active} * (${serviceCardW} + ${SERVICE_CARD_GAP}px) - (${serviceCardW}) / 2))`;

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
        padding: "44px 0 48px",
        textAlign: "center",
        overflow: "hidden",
        scrollMarginTop: SECTION_SCROLL_MARGIN_TOP,
      }}
    >

      {/* Header (~10% компактніше за базову секційну типографіку) */}
      <div style={{ padding: `0 ${PAGE_GUTTER_X}`, marginBottom: "clamp(28px, 3.5vw, 36px)" }}>
        <h2
          style={{
            ...SECTION_INTRO_TITLE,
            fontSize: "clamp(26px, 5.2vw, 52px)",
            marginTop: 0,
            marginBottom: "clamp(16px, 2.4vw, 22px)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Як ми можемо працювати разом
        </h2>
        <p
          className="services-section-lead"
          style={{
            ...SECTION_INTRO_LEAD,
            fontSize: "clamp(15px, 1.95vw, 18px)",
            margin: "0 auto",
            maxWidth: SECTION_TITLE_MAX_WIDTH,
          }}
        >
          Формат—онлайн
        </p>
      </div>

      {/* Carousel viewport — на мобільній горизонтальні поля як у відгуків для центрування активної картки */}
      <div
        ref={viewportRef}
        className="services-carousel-viewport"
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
        <div
          ref={trackRef}
          className="services-carousel-track"
          style={{
          display: "flex",
          gap: `${SERVICE_CARD_GAP}px`,
          transition: "transform .5s cubic-bezier(.4,0,.2,1)",
          transform: servicesTrackTransform,
          willChange: "transform",
          paddingLeft: "0",
        }}
        >
          {orderedServices.map((s, i) => {
            const isActive = i === active;
            const dist = Math.abs(i - active);
            const desktop = !isMobileCarousel;
            const cardBg = isActive ? "#A3BEFF" : "#C5D6FF";
            const cardBorder = isActive
              ? "2px solid rgba(255,255,255,0.65)"
              : "2px solid rgba(255,255,255,0.45)";
            const longCopy = showCardDescription(s);
            const cardDescriptionText = longCopy ? s.desc : s.descCard ?? null;
            const titleSize = desktop
              ? isActive
                ? "clamp(18px, 2.35vw, 26px)"
                : "clamp(14px, 1.75vw, 20px)"
              : isActive
                ? "clamp(20px, 2.6vw, 28px)"
                : "clamp(15px, 1.98vw, 22px)";
            const descFont = desktop
              ? isActive
                ? "clamp(13px, 1.12vw, 15px)"
                : "clamp(12px, 1.08vw, 14px)"
              : isActive
                ? "clamp(14px, 1.25vw, 16px)"
                : "clamp(13px, 1.2vw, 15px)";
            const metaFont = longCopy
              ? descFont
              : isActive
                ? desktop
                  ? "clamp(13px, 1.2vw, 16px)"
                  : "clamp(14px, 1.35vw, 17px)"
                : desktop
                  ? "clamp(13px, 1.15vw, 16px)"
                  : "clamp(14px, 1.3vw, 17px)";
            const priceLineSize = desktop
              ? isActive
                ? "clamp(18px, 2.05vw, 23px)"
                : "clamp(15px, 1.75vw, 19px)"
              : isActive
                ? "clamp(20px, 2.35vw, 25px)"
                : "clamp(17px, 2vw, 21px)";
            const cardPad = desktop
              ? isActive
                ? "clamp(14px, 2.4vw, 20px)"
                : "clamp(12px, 2.2vw, 17px)"
              : isActive
                ? "clamp(18px, 3.6vw, 25px)"
                : "clamp(14px, 3.15vw, 20px)";
            const imageAspect = desktop ? "16 / 10" : "10 / 9";
            const imageMb = desktop
              ? isActive
                ? "12px"
                : "10px"
              : isActive
                ? "16px"
                : "13px";
            const headingMb = desktop
              ? "clamp(8px, 1.1vw, 12px)"
              : "clamp(13px, 1.8vw, 16px)";
            const metaMarginB = desktop ? "7px" : "9px";
            const priceMarginB = desktop ? "14px" : "18px";
            const descLineHeight = desktop ? 1.45 : 1.55;
            /** Формат, тривалість, статус — один стиль (легкий наголос, як раніше «формат»). */
            const serviceCardMetaLineStyle = {
              fontFamily: "'Montserrat', sans-serif",
              fontSize: metaFont,
              fontWeight: 600,
              color: "#FFFFFF",
              textAlign: "left",
              margin: `0 0 ${metaMarginB} 0`,
              lineHeight: 1.45,
            };

            return (
              <div
                key={s.id}
                data-service-card
                onClick={() => { if (!dragMoved.current) setActive(i); }}
                style={{
                  background: cardBg,
                  borderRadius: desktop ? "28px" : "32px",
                  width: serviceCardW,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: cardBorder,
                  boxSizing: "border-box",
                  padding: cardPad,
                  boxShadow: "none",
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.88 : 0.5,
                  transform: isActive ? "scale(1)" : "scale(0.93)",
                  transition: "opacity .4s, transform .4s, border-color .3s, background .3s",
                  cursor: isActive ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                {/* Квадратне фото */}
                <div style={{
                  borderRadius: desktop ? "14px" : "16px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.25)",
                  /* десктоп: нижчий блок фото (16:10); мобільна: як раніше */
                  aspectRatio: imageAspect,
                  width: "100%",
                  flexShrink: 0,
                  marginBottom: imageMb,
                }}>
                  {s.img && (
                    <img src={s.img} alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  )}
                </div>

                {/* Контент: зверху — заголовок і опис; знизу (над кнопкою) — тривалість/формат, статус, ціна */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minHeight: 0,
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <h3 style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: titleSize,
                      fontWeight: 900,
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                      letterSpacing: ".03em",
                      lineHeight: 1.06,
                      margin: `0 0 ${headingMb} 0`,
                      textAlign: "left",
                      transition: "font-size .3s",
                    }}>
                      {s.title}
                    </h3>

                    {cardDescriptionText && (
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: descFont,
                        fontWeight: 400,
                        color: "#FFFFFF",
                        lineHeight: descLineHeight,
                        textAlign: "left",
                        margin: 0,
                      }}>
                        {cardDescriptionText}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "column",
                      flexShrink: 0,
                      paddingTop: "clamp(12px, 2vw, 22px)",
                    }}
                  >
                    {s.extra && <p style={serviceCardMetaLineStyle}>{s.extra}</p>}

                    {s.status && <p style={serviceCardMetaLineStyle}>{s.status}</p>}

                    {s.priceLine && s.priceEmphasis ? (
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "var(--price-dark-soft)",
                        textAlign: "left",
                        margin: `0 0 ${priceMarginB} 0`,
                        lineHeight: 1.25,
                        fontSize: priceLineSize,
                        fontWeight: 800,
                      }}>
                        <span>{s.priceLine} </span>
                        <span style={{ color: "var(--price-dark)" }}>{s.priceEmphasis}</span>
                      </p>
                    ) : s.price ? (
                      <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: priceLineSize,
                        fontWeight: 800,
                        color: "var(--price-dark)",
                        textAlign: "left",
                        margin: `0 0 ${priceMarginB} 0`,
                        lineHeight: 1.25,
                      }}>{s.price}</p>
                    ) : null}

                    <CtaPillButton
                      fullWidth
                      href={`/poslugy/${s.slug}`}
                      className={
                        s.slug === "branchi-ta-retryty"
                          ? "services-carousel-cta services-carousel-cta--long-label"
                          : "services-carousel-cta"
                      }
                      onClick={(e) => e.stopPropagation()}
                    >
                      {s.btnLabel}
                    </CtaPillButton>
                  </div>
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

        {/* Arrow buttons — циклічно (остання ↔ перша) */}
        <button
            type="button"
            className="services-nav-btn services-nav-btn--overlay services-carousel-arrow services-carousel-arrow--prev"
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
        <button
            type="button"
            className="services-nav-btn services-nav-btn--overlay services-carousel-arrow services-carousel-arrow--next"
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
      </div>

      {/* Крапки + стрілки на мобільних під каруселлю */}
      <div className="services-dots-toolbar" style={{ marginTop: "24px" }}>
        <div className="services-dots-arrow-slot services-dots-arrow-slot--left">
          <button
            type="button"
            className="services-nav-mobile"
            aria-label="Попередня послуга"
            onClick={prev}
          >
            <ArrowIcon variant="blue" direction="left" height={16} />
          </button>
        </div>
        <div
          className="services-dots-inner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {orderedServices.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={s.title}
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
        <div className="services-dots-arrow-slot services-dots-arrow-slot--right">
          <button
            type="button"
            className="services-nav-mobile"
            aria-label="Наступна послуга"
            onClick={next}
          >
            <ArrowIcon variant="blue" height={16} />
          </button>
        </div>
      </div>

      <style>{`
        .services-carousel-cta.cta-pill {
          background: linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%) !important;
          color: #a3beff !important;
          margin-top: 0;
          width: 100% !important;
          max-width: 100% !important;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(163, 190, 255, 0.35),
            0 4px 18px rgba(255, 255, 255, 0.45),
            0 8px 28px rgba(100, 130, 200, 0.2),
            0 2px 8px rgba(0, 0, 0, 0.06) !important;
        }
        .services-carousel-cta.cta-pill .cta-pill__arrow {
          background: linear-gradient(180deg, #ffffff 0%, #eef2ff 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 0 0 1.5px rgba(163, 190, 255, 0.45),
            inset 0 -1px 2px rgba(120, 140, 200, 0.1),
            0 2px 10px rgba(100, 130, 200, 0.12) !important;
        }
        @media (hover: hover) {
          .services-carousel-cta.cta-pill:hover {
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 1),
              inset 0 -1px 0 rgba(163, 190, 255, 0.28),
              0 8px 32px rgba(100, 130, 200, 0.22),
              0 4px 14px rgba(0, 0, 0, 0.08) !important;
            transform: translateY(-1px);
          }
        }
        .services-carousel-cta--long-label.cta-pill {
          font-size: clamp(13px, 1.05vw, 17px) !important;
          padding: 12px 14px 12px 20px !important;
          letter-spacing: 0.02em;
          line-height: 1.2 !important;
        }
        .services-carousel-cta--long-label.cta-pill .cta-pill__arrow {
          width: 48px !important;
          height: 40px !important;
          min-width: 48px !important;
        }
        .services-carousel-cta--long-label.cta-pill .cta-pill__arrow img {
          height: 16px !important;
        }
        @media (max-width: 768px) {
          .services-carousel-cta--long-label.cta-pill {
            font-size: clamp(11px, 2.9vw, 15px) !important;
            padding: 11px 12px 11px 16px !important;
          }
          .services-carousel-cta--long-label.cta-pill .cta-pill__arrow {
            width: 44px !important;
            height: 38px !important;
            min-width: 44px !important;
          }
          .services-carousel-cta--long-label.cta-pill .cta-pill__arrow img {
            height: 15px !important;
          }
        }
        .services-dots-toolbar {
          display: block;
        }
        .services-dots-arrow-slot {
          display: none;
        }
        .services-nav-mobile {
          display: none;
        }
        @media (min-width: 769px) {
          /* Стрілки на лінії нижнього краю фото (16:10), як на мобільній */
          .services-carousel-viewport .services-nav-btn--overlay {
            background: #fff !important;
            border: 1.5px solid #b8ccf0 !important;
            color: #7a9ae0 !important;
            box-shadow: 0 2px 12px rgba(100, 140, 200, 0.12) !important;
            top: calc(
              clamp(14px, 2.4vw, 20px) +
              (min(calc(522px * 0.81), calc(90vw * 0.81)) - 2 * clamp(14px, 2.4vw, 20px)) * 10 / 16
            ) !important;
            transform: translateY(-50%) !important;
          }
        }
        @media (max-width: 768px) {
          .services-section-lead {
            font-size: clamp(16px, 3.2vw, 20px) !important;
          }
          .services-edge-fade {
            display: none !important;
          }
          /* Нижній край фото (10:9): padding зверху + висота зображення */
          .services-carousel-viewport .services-nav-btn--overlay {
            display: flex !important;
            top: calc(
              clamp(18px, 3.6vw, 25px) +
              (min(522px, calc(100vw - 28px)) - 2 * clamp(18px, 3.6vw, 25px)) * 9 / 10
            ) !important;
            transform: translateY(-50%) !important;
          }
          .services-carousel-viewport .services-carousel-arrow--prev {
            left: max(0px, env(safe-area-inset-left, 0px)) !important;
          }
          .services-carousel-viewport .services-carousel-arrow--next {
            right: max(0px, env(safe-area-inset-right, 0px)) !important;
          }
          .services-dots-toolbar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0;
          }
          .services-dots-arrow-slot {
            display: none !important;
          }
          .services-nav-mobile {
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