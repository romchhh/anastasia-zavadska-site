import CtaPillButton from "./CtaPillButton";

const font = "'Montserrat', sans-serif";

/**
 * Херо окремої послуги — двоколонковий макет як на референсі: текст зліва, акцентний квадрат справа.
 */
export default function ServicePageHero({ service }) {
  const hasSplitPrice = service.priceLine && service.priceEmphasis;

  return (
    <section
      className="service-page-hero"
      style={{
        background: "#fff",
        padding: "64px 120px 72px 120px",
        minHeight: "calc(100vh - 84px)",
        boxSizing: "border-box",
      }}
    >
      <div className="service-page-hero__text" style={{ minWidth: 0 }}>
        <h1
          className="service-hero-title"
          style={{
            fontFamily: font,
            fontSize: "clamp(56px, 7.5vw, 100px)",
            fontWeight: 900,
            lineHeight: "0.96",
            color: "#111",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            margin: "0 0 24px 0",
          }}
        >
          {service.title}
        </h1>

        <p
          style={{
            fontFamily: font,
            fontSize: "clamp(20px, 2.5vw, 34px)",
            fontWeight: 600,
            color: "#111",
            textTransform: "uppercase",
            lineHeight: "1.15",
            margin: "0 0 20px 0",
            letterSpacing: "0.01em",
          }}
        >
          {service.desc}
        </p>

        {service.extra && (
          <p
            style={{
              fontFamily: font,
              fontSize: "clamp(13px, 1.2vw, 17px)",
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
              fontSize: "clamp(13px, 1.2vw, 17px)",
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
                fontSize: "clamp(13px, 1.2vw, 17px)",
                fontWeight: 600,
                color: "#999",
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
                color: "#111",
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
              color: "#111",
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
              maxWidth: "48ch",
            }}
          >
            {service.note}
          </p>
        )}

        <CtaPillButton className="service-page-hero__cta" href="#контакти" fullWidth>
          Записатися на консультацію
        </CtaPillButton>
      </div>

      <div
        className="service-page-hero__visual"
        style={{
          flexShrink: 0,
          width: "min(420px, 38vw)",
          aspectRatio: "1",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#ccd9ff",
          alignSelf: "center",
        }}
      >
        {service.img ? (
          <img
            src={service.img}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : null}
      </div>

      <style>{`
        .service-page-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-rows: auto;
          align-items: center;
          column-gap: clamp(32px, 5vw, 64px);
        }
        .service-page-hero__text {
          grid-column: 1;
        }
        .service-page-hero__visual {
          grid-column: 2;
          grid-row: 1;
        }
        .service-page-hero__cta {
          max-width: 100%;
        }
        @media (max-width: 768px) {
          .service-hero-title {
            font-size: clamp(40px, 11vw, 56px) !important;
            line-height: 0.98 !important;
          }
          .service-page-hero {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            padding: 40px 40px 48px !important;
            min-height: unset !important;
            row-gap: 32px;
          }
          .service-page-hero__text {
            grid-column: 1;
            grid-row: 1;
          }
          .service-page-hero__visual {
            grid-column: 1;
            grid-row: 2;
            width: 100% !important;
            max-width: min(100%, 360px);
            justify-self: center;
          }
        }
        @media (max-width: 420px) {
          .service-hero-title {
            font-size: clamp(34px, 12vw, 44px) !important;
          }
        }
      `}</style>
    </section>
  );
}
