"use client";

import { CONTACTS } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";

const accent = "#99B2F8";
const font = "'Montserrat', sans-serif";

const instagramHref = `https://www.instagram.com/${CONTACTS.instagram.replace(/^@/, "")}/`;

const ICON = 76;

function IconTelegram() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="21" stroke={accent} strokeWidth="1.75" />
      <path
        d="M14.5 23.2L32.8 15.5c1.1-.5 1 .3.8 1l-3.4 16c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.8.4l.3-4.6 8.3-7.5c.4-.3-.1-.5-.6-.2l-10.3 6.5-4.4-1.4c-1-.3-1-1 .2-1.5Z"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="10" y="10" width="28" height="28" rx="8" stroke={accent} strokeWidth="1.75" />
      <circle cx="24" cy="24" r="6.5" stroke={accent} strokeWidth="1.75" />
      <circle cx="31.5" cy="16.5" r="1.25" fill={accent} />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="8" y="14" width="32" height="22" rx="2.5" stroke={accent} strokeWidth="1.75" />
      <path d="M8.9 15.5L24 26.5l15.1-11" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactSection() {
  const iconLinks = [
    { href: CONTACTS.telegramLink, label: "Telegram", icon: <IconTelegram /> },
    { href: instagramHref, label: "Instagram", icon: <IconInstagram /> },
    { href: `mailto:${CONTACTS.email}`, label: "Email", icon: <IconEmail />, external: false },
  ];

  return (
    <section
      id="контакти"
      className="contact-section-outer"
      style={{
        background: "#fff",
        padding: "clamp(72px, 10vw, 120px) clamp(24px, 6vw, 48px) clamp(88px, 11vw, 120px)",
        boxSizing: "border-box",
      }}
    >
      <div
        className="contact-inner"
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          className="contact-hero-title"
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
          Зв&apos;яжіться зі мною
        </h2>
        <p
          className="contact-hero-sub"
          style={{
            fontFamily: font,
            fontSize: "clamp(20px, 2.5vw, 34px)",
            fontWeight: 600,
            color: "#111",
            textTransform: "uppercase",
            lineHeight: "1.15",
            margin: "0 0 clamp(32px, 5vw, 48px) 0",
            letterSpacing: "0.01em",
            maxWidth: "min(100%, 720px)",
          }}
        >
          Напишіть — і ми разом знайдемо формат, який підійде саме вам
        </p>

        <div
          className="contact-icons-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(40px, 8vw, 72px)",
            margin: "0 0 clamp(44px, 6.5vw, 64px) 0",
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
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "none";
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        <div
          className="contact-cta-wrap"
          style={{
            width: "100%",
            maxWidth: "min(100%, 520px)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CtaPillButton
            href={CONTACTS.telegramLink}
            target="_blank"
            rel="noreferrer"
            fullWidth
          >
            Написати в телеграм
          </CtaPillButton>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-section-outer {
            padding: 56px 24px 72px !important;
          }
          .contact-hero-title {
            font-size: clamp(40px, 11vw, 56px) !important;
            line-height: 0.98 !important;
          }
          .contact-icons-row {
            gap: 40px !important;
            margin-bottom: 40px !important;
          }
          .contact-icon-link svg {
            width: 68px !important;
            height: 68px !important;
          }
        }
        @media (max-width: 420px) {
          .contact-section-outer {
            padding: 44px 16px 56px !important;
          }
          .contact-hero-title {
            font-size: clamp(34px, 12vw, 44px) !important;
          }
          .contact-icons-row {
            gap: 28px !important;
          }
          .contact-icon-link svg {
            width: 56px !important;
            height: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
