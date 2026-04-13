import CtaPillButton from "./CtaPillButton";
import {
  PAGE_GUTTER_X,
  SECTION_INTRO_LEAD,
  SECTION_INTRO_TITLE,
  SECTION_TITLE_MAX_WIDTH,
} from "./sectionIntroStyles";

const font = "'Montserrat', sans-serif";

/**
 * Херо окремої послуги — двоколонковий макет як на референсі: текст зліва, акцентний квадрат справа.
 */
export default function ServicePageHero({ service }) {
  const hasSplitPrice = service.priceLine && service.priceEmphasis;
  const bookingCtaHref =
    service.showBookingCalendar === true ? "#booking-calendar" : "#booking-form";

  return (
    <section
      className="service-page-hero"
      style={{
        background: "#fff",
        padding: `56px ${PAGE_GUTTER_X} 60px ${PAGE_GUTTER_X}`,
        minHeight: "unset",
        boxSizing: "border-box",
      }}
    >
      <div className="service-page-hero__text" style={{ minWidth: 0 }}>
        <h1
          className="service-hero-title"
          style={{
            ...SECTION_INTRO_TITLE,
            textAlign: "left",
            marginLeft: 0,
            marginRight: "auto",
          }}
        >
          {service.title}
        </h1>

        <p
          className="service-hero-lead"
          style={{
            ...SECTION_INTRO_LEAD,
            textAlign: "left",
            color: "#444",
            maxWidth: SECTION_TITLE_MAX_WIDTH,
            margin: "0 0 clamp(16px, 2.5vw, 24px) 0",
          }}
        >
          {service.desc}
        </p>

        {service.extra && (
          <p
            style={{
              fontFamily: font,
              fontSize: "clamp(15px, 1.35vw, 17px)",
              fontWeight: 600,
              color: "#999",
              textTransform: "uppercase",
              lineHeight: "1",
              letterSpacing: "0.04em",
              margin: "0 0 48px 0",
            }}
          >
            {service.extra}
          </p>
        )}

        {service.status && (
          <p
            style={{
              fontFamily: font,
              fontSize: "clamp(15px, 1.35vw, 17px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#4a74c8",
              textTransform: "uppercase",
              lineHeight: "1",
              letterSpacing: "0.04em",
              margin: "0 0 48px 0",
            }}
          >
            {service.status}
          </p>
        )}

        {hasSplitPrice ? (
          <p style={{ margin: "0 0 28px 0", lineHeight: 1.2 }}>
            <span
              style={{
                fontFamily: font,
                fontSize: "clamp(15px, 1.35vw, 17px)",
                fontWeight: 600,
                color: "var(--price-dark-soft)",
                textTransform: "uppercase",
                lineHeight: "1",
                letterSpacing: "0.04em",
              }}
            >
              {service.priceLine}{" "}
            </span>
            <span
              style={{
                fontFamily: font,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 900,
                color: "var(--price-dark)",
              }}
            >
              {service.priceEmphasis}
            </span>
          </p>
        ) : service.price ? (
          <p
            style={{
              fontFamily: font,
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 800,
              color: "var(--price-dark)",
              margin: "0 0 28px 0",
            }}
          >
            {service.price}
          </p>
        ) : (
          <div style={{ marginBottom: 28 }} />
        )}

        {service.note && (
          <p
            style={{
              fontFamily: font,
              fontSize: "13px",
              color: "#4b5f87",
              lineHeight: 1.65,
              margin: "0 0 28px 0",
              maxWidth: SECTION_TITLE_MAX_WIDTH,
            }}
          >
            {service.note}
          </p>
        )}

        <CtaPillButton className="service-page-hero__cta" href={bookingCtaHref}>
          Записатися на сесію
        </CtaPillButton>
      </div>

      <div
        className="service-page-hero__visual"
        style={{
          flexShrink: 0,
          width: "min(420px, 38vw)",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#ccd9ff",
        }}
      >
        {service.img ? (
          <img
            src={service.img}
            alt=""
            className="service-page-hero__img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        ) : null}
      </div>

      <style>{`
        .service-page-hero {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(32px, 5vw, 64px);
        }
        .service-page-hero__text {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .service-page-hero__visual {
          flex: 0 0 auto;
          width: min(420px, 38vw);
          aspect-ratio: 1;
          height: auto;
          align-self: center;
          position: relative;
          box-shadow:
            0 0 0 5px #fff,
            0 10px 32px rgba(120, 150, 200, 0.2);
          transition: box-shadow 0.28s ease, transform 0.28s ease;
        }
        .service-page-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover) {
          .service-page-hero .service-page-hero__visual:hover {
            box-shadow:
              0 0 0 5px #fff,
              0 18px 44px rgba(100, 130, 200, 0.28);
            transform: translateY(-4px);
          }
          .service-page-hero .service-page-hero__visual:hover .service-page-hero__img {
            transform: scale(1.05);
          }
        }
        .service-page-hero__cta {
          flex-shrink: 0;
          align-self: flex-start;
          width: fit-content;
          max-width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .service-hero-title {
            white-space: normal !important;
            font-size: clamp(24px, 7vw, 40px) !important;
            line-height: 1.05 !important;
          }
          .service-hero-lead {
            font-size: clamp(16px, 4.2vw, 19px) !important;
            line-height: 1.45 !important;
          }
          .service-page-hero {
            flex-direction: column;
            align-items: stretch;
            padding: 40px ${PAGE_GUTTER_X} 48px !important;
            min-height: unset !important;
            gap: 32px;
          }
          .service-page-hero__text {
            flex: none;
          }
          .service-page-hero__visual {
            flex: none;
            width: 100% !important;
            max-width: min(100%, 360px);
            align-self: center;
            aspect-ratio: 1;
            min-height: unset;
            height: auto;
          }
          .service-page-hero__img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .service-page-hero__cta {
            align-self: center;
            width: fit-content !important;
          }
        }
        @media (max-width: 420px) {
          .service-hero-title {
            font-size: clamp(22px, 6.5vw, 34px) !important;
          }
        }
      `}</style>
    </section>
  );
}
