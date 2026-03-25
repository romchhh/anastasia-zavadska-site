"use client";

import { FOOTER_MENU, FOOTER_LEGAL, CONTACTS } from "../data/siteData";

const BG = "#a1b6f9";
const font = "'Montserrat', sans-serif";

function menuHref(label) {
  return `#${label.toLowerCase().replace(/\s/g, "-")}`;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer"
      style={{
        background: BG,
        fontFamily: font,
        boxSizing: "border-box",
      }}
    >
      <div
        className="footer-inner"
        style={{
          padding: "clamp(40px, 5vw, 64px) clamp(24px, 6vw, 120px) clamp(28px, 4vw, 40px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "clamp(32px, 5vw, 56px)",
        }}
      >
        {/* Ліва колонка: CTA + ім’я */}
        <div
          className="footer-brand"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px, 3vw, 28px)",
            minWidth: "min(100%, 260px)",
            flex: "0 1 auto",
          }}
        >
          <a
            href={CONTACTS.telegramLink}
            target="_blank"
            rel="noreferrer"
            className="footer-cta-btn"
            style={{
              textDecoration: "none",
              alignSelf: "flex-start",
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.85)",
              borderRadius: "50px",
              boxSizing: "border-box",
              padding: "0 clamp(16px, 2vw, 22px) 0 clamp(28px, 3.5vw, 44px)",
              height: "calc(0.8 * 84px)",
              minWidth: "min(100%, 268px)",
              fontFamily: font,
              fontSize: "clamp(14px, 1.35vw, 17px)",
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              letterSpacing: ".04em",
              transition: "background .2s, color .2s, box-shadow .2s",
              whiteSpace: "nowrap",
            }}
          >
            Приєднатися
            <span
              className="footer-cta-btn-arrow"
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "2px solid rgba(255,255,255,0.7)",
                borderRadius: "50%",
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 17,
                flexShrink: 0,
                transition: "background .2s, border-color .2s, color .2s",
                boxSizing: "border-box",
              }}
              aria-hidden
            >
              →
            </span>
          </a>

          <div className="footer-brand-text">
            <p
              className="footer-brand-title"
              style={{
                fontSize: "clamp(20px, 2.8vw, 32px)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                lineHeight: 1.12,
                margin: "0 0 10px 0",
              }}
            >
              Анастасія Завадська
            </p>
            <p
              className="footer-copyright"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                color: "rgba(255,255,255,.85)",
                fontWeight: 500,
                margin: 0,
              }}
            >
              © <span suppressHydrationWarning>{year}</span> Анастасія Завадська
            </p>
          </div>
        </div>

        {/* Меню + юридичні посилання */}
        <div
          className="footer-nav-wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(40px, 8vw, 100px)",
            alignItems: "flex-start",
            flex: "1 1 auto",
            justifyContent: "flex-end",
          }}
        >
          <div className="footer-menu-block">
            <p
              className="footer-menu-heading"
              style={{
                fontSize: "clamp(12px, 1.1vw, 14px)",
                color: "#fff",
                fontWeight: 800,
                margin: "0 0 16px 0",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              Меню
            </p>
            <ul
              className="footer-menu-list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px, 1.2vw, 14px)",
              }}
            >
              {FOOTER_MENU.map((item) => (
                <li key={item}>
                  <a
                    href={menuHref(item)}
                    style={{
                      fontSize: "clamp(14px, 1.25vw, 17px)",
                      color: "#fff",
                      fontWeight: 600,
                      textDecoration: "none",
                      opacity: 0.95,
                      transition: "opacity .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.95";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="footer-legal-col"
            style={{
              paddingTop: "clamp(28px, 3.5vw, 38px)",
            }}
          >
            <ul
              className="footer-legal-list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px, 1.2vw, 14px)",
              }}
            >
              {FOOTER_LEGAL.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: "clamp(14px, 1.25vw, 17px)",
                      color: "#fff",
                      fontWeight: 600,
                      textDecoration: "none",
                      opacity: 0.95,
                      transition: "opacity .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.95";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Плашка розробника */}
      <div
        className="footer-credit-wrap"
        style={{
          borderTop: "1px solid rgba(255,255,255,.22)",
          padding: "16px clamp(24px, 6vw, 120px) 24px",
          textAlign: "center",
        }}
      >
        <a
          className="footer-credit-link"
          href="https://telebots.site/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "clamp(11px, 1vw, 13px)",
            fontWeight: 600,
            color: "rgba(255,255,255,.72)",
            textDecoration: "none",
            letterSpacing: ".04em",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,.72)";
          }}
        >
          Telebots | Розробка сайтів
        </a>
      </div>

      <style>{`
        .footer-cta-btn:hover {
          background: #fff !important;
          color: #a1b6f9 !important;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
        }
        .footer-cta-btn:hover .footer-cta-btn-arrow {
          background: #a1b6f9 !important;
          border-color: #a1b6f9 !important;
          color: #fff !important;
        }
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 44px !important;
            padding: 48px 28px 40px !important;
          }
          .footer-brand {
            align-items: center !important;
            width: 100% !important;
            min-width: 0 !important;
            gap: 28px !important;
          }
          .footer-brand .footer-cta-btn {
            align-self: center !important;
          }
          .footer-brand-text {
            text-align: center !important;
          }
          .footer-brand-title {
            font-size: clamp(26px, 7vw, 36px) !important;
            margin-bottom: 14px !important;
          }
          .footer-copyright {
            font-size: 15px !important;
          }
          .footer-nav-wrap {
            width: 100% !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 36px !important;
          }
          .footer-menu-block,
          .footer-legal-col {
            width: 100% !important;
            max-width: 360px !important;
            text-align: center !important;
            padding-top: 0 !important;
          }
          .footer-menu-heading {
            font-size: 15px !important;
            margin-bottom: 18px !important;
          }
          .footer-menu-list,
          .footer-legal-list {
            align-items: center !important;
            gap: 14px !important;
          }
          .footer-menu-list a,
          .footer-legal-list a {
            font-size: 18px !important;
          }
          .footer-cta-btn {
            min-width: 0 !important;
            width: 100%;
            max-width: 340px;
            height: calc(0.8 * 68px) !important;
            font-size: 16px !important;
            padding: 0 20px 0 36px !important;
          }
          .footer-credit-wrap {
            padding: 20px 28px 28px !important;
          }
          .footer-credit-link {
            font-size: 14px !important;
          }
        }
      `}</style>
    </footer>
  );
}
