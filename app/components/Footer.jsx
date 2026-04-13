"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_MENU, FOOTER_LEGAL_LINKS, navLinkHref } from "../data/siteData";
import { PAGE_GUTTER_X } from "./sectionIntroStyles";

const BG = "#a1b6f9";
const font = "'Montserrat', sans-serif";

export default function Footer() {
  const pathname = usePathname();
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
          padding: `clamp(40px, 5vw, 64px) ${PAGE_GUTTER_X} clamp(28px, 4vw, 40px)`,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "clamp(32px, 5vw, 56px)",
        }}
      >
        {/* Ліва колонка: ім’я */}
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
          <div className="footer-brand-text">
            <Link
              href="/"
              className="footer-brand-title"
              style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "none",
                letterSpacing: ".04em",
                lineHeight: 1.12,
                margin: "0 0 10px 0",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              ANASTASIIA ZAVADSKA
            </Link>
            <p
              className="footer-copyright"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                color: "rgba(255,255,255,.85)",
                fontWeight: 500,
                margin: 0,
              }}
            >
              © <span suppressHydrationWarning>{year}</span> Anastasiia Zavadska{" "}
              <Heart
                aria-hidden
                size={13}
                strokeWidth={2}
                fill="rgba(255,255,255,0.35)"
                color="rgba(255,255,255,0.95)"
                style={{ display: "inline-block", verticalAlign: "-0.15em", marginLeft: 4 }}
              />
            </p>
          </div>
        </div>

        {/* Меню + юридичні посилання */}
        <div
          className="footer-nav-wrap"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(32px, 6.5vw, 80px)",
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
                    href={navLinkHref(item, pathname)}
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
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
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
                    {item.label}
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
          padding: `16px ${PAGE_GUTTER_X} 24px`,
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
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 32px !important;
            padding: 36px ${PAGE_GUTTER_X} 32px !important;
          }
          .footer-brand {
            align-items: center !important;
            width: 100% !important;
            min-width: 0 !important;
            gap: 22px !important;
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
            gap: 28px !important;
          }
          .footer-menu-block,
          .footer-legal-col {
            width: 100% !important;
            max-width: 100% !important;
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
          .footer-credit-wrap {
            padding: 16px ${PAGE_GUTTER_X} 22px !important;
          }
          .footer-credit-link {
            font-size: 14px !important;
          }
        }
      `}</style>
    </footer>
  );
}
