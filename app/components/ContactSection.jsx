"use client";

import { CONTACTS } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";
import {
  PAGE_GUTTER_X,
  SECTION_INTRO_LEAD,
  SECTION_INTRO_TITLE,
  SECTION_LAYOUT_MAX_WIDTH,
} from "./sectionIntroStyles";

const accent = "#92B2FF";

const instagramHref = `https://www.instagram.com/${CONTACTS.instagram.replace(/^@/, "")}/`;

const ICON = 48;

function SocialIcon({ src, alt }) {
  return (
    <span className="contact-icon-surface">
      <img
        className="contact-social-icon"
        src={src}
        alt={alt}
        width={ICON}
        height={ICON}
        style={{
          width: ICON,
          height: ICON,
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
        }}
      />
    </span>
  );
}

export default function ContactSection() {
  const iconLinks = [
    { href: instagramHref, label: "Instagram", icon: <SocialIcon src="/insta.png" alt="" /> },
    { href: CONTACTS.telegramLink, label: "Telegram", icon: <SocialIcon src="/telegram.png" alt="" /> },
    {
      href: `mailto:${CONTACTS.email}`,
      label: "Email",
      icon: <SocialIcon src="/mail.png" alt="" />,
      external: false,
    },
  ];

  return (
    <section
      id="контакти"
      className="contact-section-outer"
      style={{
        background: "#fff",
        padding: `clamp(42px, 5.5vw, 68px) ${PAGE_GUTTER_X} clamp(60px, 8vw, 88px)`,
        boxSizing: "border-box",
      }}
    >
      <div
        className="contact-inner"
        style={{
          maxWidth: SECTION_LAYOUT_MAX_WIDTH,
          margin: 0,
          width: "100%",
          textAlign: "left",
        }}
      >
        <div className="contact-head">
          <h2
            className="contact-hero-title"
            style={{
              ...SECTION_INTRO_TITLE,
              textAlign: "left",
              marginLeft: 0,
              marginRight: "auto",
            }}
          >
            Зв&apos;яжіться зі мною
          </h2>
          <p
            className="contact-hero-sub"
            style={{
              ...SECTION_INTRO_LEAD,
              textAlign: "left",
              maxWidth: "min(100%, 52ch)",
            }}
          >
            Напишіть — і ми разом знайдемо формат, який підійде саме вам
          </p>
        </div>
      </div>

      {/* Ряд іконок + кнопка; правий відступ як у футері (без виносу кнопки за padding) */}
      <div
        className="contact-bottom-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(16px, 3vw, 28px)",
          marginTop: "clamp(28px, 4vw, 40px)",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div
          className="contact-icons-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(28px, 5vw, 44px)",
            maxWidth: SECTION_LAYOUT_MAX_WIDTH,
          }}
        >
          {iconLinks.map(({ href, label, icon, external }) => (
            <a
              key={label}
              href={href}
              target={external === false ? undefined : "_blank"}
              rel={external === false ? undefined : "noreferrer"}
              aria-label={label}
              className="contact-icon-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: accent,
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="contact-cta-wrap">
          <CtaPillButton
            href={CONTACTS.telegramLink}
            target="_blank"
            rel="noreferrer"
            variant="periwinkle"
          >
            Написати в телеграм
          </CtaPillButton>
        </div>
      </div>

      <style>{`
        .contact-head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .contact-icon-surface {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(52px, 11vw, 64px);
          height: clamp(52px, 11vw, 64px);
          border-radius: 18px;
          background: linear-gradient(145deg, #ffffff 0%, #f3f7ff 100%);
          border: 1px solid rgba(146, 178, 255, 0.45);
          box-shadow:
            0 4px 18px rgba(100, 130, 200, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease,
            border-color 0.2s ease;
        }
        .contact-icon-link:hover .contact-icon-surface {
          transform: translateY(-3px);
          box-shadow:
            0 12px 36px rgba(100, 130, 200, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          border-color: rgba(146, 178, 255, 0.75);
        }
        .contact-social-icon {
          transition: transform 0.25s ease;
        }
        .contact-icon-link:hover .contact-social-icon {
          transform: scale(1.06);
        }
        .contact-cta-wrap {
          flex-shrink: 0;
          margin-left: auto;
        }
        @media (min-width: 769px) {
          .contact-section-outer {
            padding-left: ${PAGE_GUTTER_X} !important;
            padding-right: ${PAGE_GUTTER_X} !important;
          }
          .contact-bottom-row {
            flex-wrap: nowrap !important;
          }
        }
        @media (max-width: 768px) {
          .contact-section-outer {
            padding: 32px ${PAGE_GUTTER_X} 48px !important;
          }
          .contact-bottom-row {
            flex-direction: column;
            align-items: stretch !important;
          }
          .contact-cta-wrap {
            margin-left: 0 !important;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .contact-icons-row {
            justify-content: center;
            gap: clamp(20px, 4.5vw, 36px) !important;
          }
          .contact-social-icon {
            width: 40px !important;
            height: 40px !important;
          }
          .contact-hero-title,
          .contact-hero-sub {
            text-align: left !important;
          }
          .contact-hero-sub {
            max-width: 100% !important;
            font-size: clamp(16px, 2.8vw, 22px) !important;
          }
        }
        @media (max-width: 420px) {
          .contact-section-outer {
            padding: 28px ${PAGE_GUTTER_X} 40px !important;
          }
          .contact-social-icon {
            width: 36px !important;
            height: 36px !important;
          }
          .contact-icons-row {
            gap: clamp(18px, 4vw, 28px) !important;
          }
        }
      `}</style>
    </section>
  );
}
