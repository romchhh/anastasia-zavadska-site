import { useState } from "react";

/**
 * Національний номер UA: 10 цифр, формат 0XXXXXXXXX (0671234567).
 * Ввід: 067… | 380671234567 | 80671234567 | по цифрах після 380 (3806 → 06…).
 */
function extractNational10Digits(raw) {
  const all = String(raw).replace(/\D/g, "");
  if (!all.length) return "";

  if (all === "3" || all === "38" || all === "380") return "";

  let d = all;
  let stripped380 = false;
  while (d.length > 3 && d.startsWith("380")) {
    stripped380 = true;
    d = d.slice(3);
  }

  if (stripped380) {
    if (!d.length || d === "380") return "";
    if (d[0] === "0") return d.slice(0, 10);
    return (`0${d}`).slice(0, 10);
  }

  if (d.startsWith("80") && d.length >= 3) {
    d = (`0${d.slice(2)}`).slice(0, 10);
    return d;
  }

  if (d[0] === "0") {
    return d.slice(0, 10);
  }

  if (d.length <= 9 && /^[679]/.test(d)) {
    return (`0${d}`).slice(0, 10);
  }

  return d.slice(0, 10);
}

function normalizePhoneDigits(value) {
  return extractNational10Digits(value);
}

/** Маска: +38 (067) 123-45-67 — лише з уже нормалізованих 10 цифр */
function formatNationalUa(national10) {
  const dg = national10.slice(0, 10);
  if (!dg.length) return "";

  const a = dg.slice(0, 3);
  const b = dg.slice(3, 6);
  const c = dg.slice(6, 8);
  const tail = dg.slice(8, 10);

  let out = `+38 (${a}`;
  if (a.length === 3) {
    out += ")";
    if (b.length) {
      out += ` ${b}`;
      if (b.length === 3 && c.length) {
        out += `-${c}`;
        if (c.length === 2 && tail.length) {
          out += `-${tail}`;
        }
      }
    }
  }
  return out;
}

function formatUaPhoneInput(value) {
  return formatNationalUa(extractNational10Digits(value));
}

function toUaE164(normalized10) {
  if (normalized10.length !== 10 || normalized10[0] !== "0") return null;
  return `+380${normalized10.slice(1)}`;
}

/**
 * BookingForm
 *
 * Props:
 *   duration  {string}  – e.g. "50 хв"
 *   price     {string}  – e.g. "50 $"
 *   slotSummary {string} – обраний у календарі час (показується над полями)
 *   requireSlot {bool}   – чи обов’язковий вибір слоту (календар)
 *   onlinePayment {bool} – «Оплатити» + ціна; false — запит без оплати на сайті
 *   onSubmit  {fn}      – після валідації; інтеграція (наприклад Telegram) — ззовні
 */
export default function BookingForm({
  duration = "50 хв",
  price = "50 $",
  slotSummary,
  requireSlot = true,
  onlinePayment = true,
  onSubmit,
}) {
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    social: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handlePhoneChange = (e) => {
    const phone = formatUaPhoneInput(e.target.value);
    setFields((prev) => ({ ...prev, phone }));
  };

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Введіть ваше ім'я";
    const phoneDigits = normalizePhoneDigits(fields.phone);
    if (!phoneDigits) e.phone = "Введіть номер телефону";
    else if (phoneDigits.length < 10) e.phone = "Введіть повний номер (10 цифр)";
    return e;
  };

  const phoneComplete = normalizePhoneDigits(fields.phone).length === 10;

  const slotOk = !requireSlot || Boolean(slotSummary?.trim());

  const canSubmit =
    slotOk && Boolean(fields.name.trim()) && phoneComplete;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    const phoneDigits = normalizePhoneDigits(fields.phone);
    const phone = toUaE164(phoneDigits) ?? fields.phone.trim();
    onSubmit?.({ ...fields, phone });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{formStyles}</style>
        <div id="booking-form" className="bf-wrap">
          <div className="bf-success">
            <div className="bf-success-icon">✓</div>
            <h2 className="bf-success-title">
              {onlinePayment ? "Дякуємо за запис!" : "Дякуємо за запит!"}
            </h2>
            <p className="bf-success-text">
              Якщо не відкрилось вікно Telegram, знайдіть чат зі мною вручну — текст запиту ви вже
              сформували.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{formStyles}</style>
      <div id="booking-form" className="bf-wrap">
        <h2 className="bf-title">
          Заповніть дані для
          <br />
          підтвердження запису
        </h2>

        {slotSummary ? (
          <div className="bf-slot-hint">
            <span className="bf-slot-hint-label">Обраний час</span>
            <span className="bf-slot-hint-value">{slotSummary}</span>
          </div>
        ) : null}

        <div className="bf-body">
          {/* Left: fields */}
          <div className="bf-fields">
            <Field
              label="Ім'я"
              placeholder="Напишіть ваше ім'я"
              value={fields.name}
              onChange={set("name")}
              error={errors.name}
            />

            <Field
              label="Телефон"
              placeholder="+38 (067) 123-45-67"
              value={fields.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />

            <Field
              label="Соц-мережі (для зв'язку)"
              placeholder="Напишіть ваші соц-мережі"
              value={fields.social}
              onChange={set("social")}
            />

            <Field
              label="Опис проблеми"
              placeholder=""
              value={fields.description}
              onChange={set("description")}
              multiline
            />
          </div>

          {/* Right: info badge */}
          <div className="bf-sidebar">
            <div className="bf-badge">
              <div className="bf-badge-item">
                <ClockIcon />
                <span>Тривалість: {duration}</span>
              </div>
              {onlinePayment ? (
                <>
                  <div className="bf-badge-divider" />
                  <div className="bf-badge-item">
                    <LockIcon />
                    <span>Ціна: {price}</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bf-cta-wrap">
          <button type="button" className="bf-cta" onClick={handleSubmit} disabled={!canSubmit}>
            {onlinePayment ? "ОПЛАТИТИ" : "НАДІСЛАТИ ЗАПИТ"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── sub-components ─────────────────────────────────────────────────────────── */

function Field({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  multiline,
  inputMode,
  autoComplete,
}) {
  return (
    <div className="bf-field">
      <label className="bf-label">{label}</label>
      {multiline ? (
        <textarea
          className={`bf-input bf-textarea${error ? " bf-input-err" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={`bf-input${error ? " bf-input-err" : ""}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          autoComplete={autoComplete}
        />
      )}
      {error && <span className="bf-error">{error}</span>}
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ── styles ──────────────────────────────────────────────────────────────────── */

const formStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

  .bf-wrap {
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    max-width: none;
    min-width: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Розмір як .bcal-title, колір — чорний */
  .bf-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-style: normal;
    font-size: clamp(22px, 5vw, 40px);
    line-height: 104%;
    letter-spacing: 0;
    text-align: center;
    text-transform: uppercase;
    color: #111;
    width: 100%;
    max-width: min(100%, 920px);
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: clamp(20px, 3vw, 28px);
    box-sizing: border-box;
  }

  .bf-slot-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: clamp(20px, 4vw, 28px);
    padding: clamp(14px, 3vw, 16px) clamp(16px, 4vw, 22px);
    background: #eaf0ff;
    border-radius: clamp(12px, 2.5vw, 16px);
    border: 1.5px solid rgba(99,145,255,.35);
    max-width: min(100%, 640px);
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
  }
  .bf-slot-hint-label {
    font-size: clamp(10px, 1.8vw, 11px);
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #6391FF;
  }
  .bf-slot-hint-value {
    font-size: clamp(13px, 2.8vw, 15px);
    font-weight: 600;
    color: #1a1a2e;
    text-align: center;
    line-height: 1.45;
    word-break: break-word;
    hyphens: auto;
  }
  .bf-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: clamp(24px, 4vw, 40px);
    align-items: start;
  }

  /* ── fields ── */
  .bf-fields {
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 3vw, 22px);
    min-width: 0;
  }

  .bf-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .bf-label {
    font-size: clamp(13px, 1.6vw, 14px);
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: .01em;
  }

  .bf-input {
    background: #dce7ff;
    border: 2px solid transparent;
    border-radius: clamp(12px, 2vw, 14px);
    padding: clamp(14px, 2.5vw, 16px) clamp(16px, 3vw, 20px);
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(15px, 2.2vw, 16px);
    font-weight: 500;
    color: #1a1a2e;
    outline: none;
    transition: border-color .18s, box-shadow .18s;
    width: 100%;
    box-sizing: border-box;
    resize: none;
  }
  .bf-input::placeholder { color: #8fa3d0; }
  .bf-input:focus {
    border-color: #6391FF;
    box-shadow: 0 0 0 3px rgba(99,145,255,.18);
    background: #eaf0ff;
  }
  .bf-input-err {
    border-color: #ff6b6b !important;
  }
  .bf-textarea {
    min-height: clamp(120px, 28vw, 160px);
  }
  .bf-error {
    font-size: 12px;
    font-weight: 600;
    color: #e53e3e;
    margin-top: -2px;
  }

  /* ── sidebar badge ── */
  .bf-sidebar {
    padding-top: clamp(0px, 2vw, 26px);
    min-width: 0;
  }
  .bf-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: #6391FF;
    border-radius: 50px;
    padding: clamp(12px, 2.5vw, 14px) clamp(16px, 3vw, 24px);
    gap: 0;
    color: #fff;
    box-shadow: 0 6px 24px rgba(99,145,255,.35);
    max-width: 100%;
    box-sizing: border-box;
  }
  .bf-badge-item {
    display: flex;
    align-items: center;
    gap: clamp(6px, 1.5vw, 9px);
    font-size: clamp(13px, 2vw, 15px);
    font-weight: 600;
    padding: 0 clamp(8px, 2vw, 12px);
    white-space: nowrap;
  }
  .bf-badge-item svg {
    flex-shrink: 0;
    width: clamp(18px, 3vw, 22px);
    height: clamp(18px, 3vw, 22px);
  }
  .bf-badge-divider {
    width: 1.5px;
    height: clamp(18px, 3vw, 22px);
    background: rgba(255,255,255,.45);
    flex-shrink: 0;
  }

  /* ── cta ── */
  .bf-cta-wrap {
    display: flex;
    justify-content: center;
    margin-top: clamp(28px, 5vw, 36px);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .bf-cta {
    background: #6391FF;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: clamp(16px, 3vw, 18px) clamp(28px, 6vw, 52px);
    min-height: 48px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(14px, 1.5vw, 17px);
    font-weight: 700;
    letter-spacing: .06em;
    cursor: pointer;
    transition: background .15s, transform .13s, box-shadow .15s, opacity .15s;
    box-shadow: 0 6px 24px rgba(99,145,255,.32);
  }
  .bf-cta:hover:not(:disabled) {
    background: #4a75e8;
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(99,145,255,.42);
  }
  .bf-cta:active:not(:disabled) {
    transform: translateY(0);
  }
  .bf-cta:disabled {
    background: #c5cfe8;
    color: rgba(255,255,255,0.92);
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.85;
    transform: none;
  }

  /* ── success ── */
  .bf-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: clamp(220px, 50vh, 320px);
    gap: clamp(12px, 2.5vw, 16px);
    padding: clamp(16px, 4vw, 24px) clamp(12px, 3vw, 16px);
    text-align: center;
    box-sizing: border-box;
    animation: bfFadeIn .3s ease;
  }
  @keyframes bfFadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: none; } }
  .bf-success-icon {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: #6391FF;
    color: #fff;
    font-size: 32px;
    display: flex; align-items: center; justify-content: center;
  }
  .bf-success-title {
    font-size: clamp(20px, 4.5vw, 26px);
    font-weight: 800;
    color: #1a1a2e;
    margin: 0;
    line-height: 1.2;
  }
  .bf-success-text {
    font-size: clamp(14px, 3.2vw, 16px);
    font-weight: 500;
    color: #555;
    margin: 0;
    text-align: center;
    line-height: 1.5;
    max-width: 36ch;
  }

  /* Планшети та вузькі ноутбуки: одна колонка, бейдж зверху */
  @media (max-width: 900px) {
    .bf-body {
      grid-template-columns: 1fr;
      gap: clamp(20px, 4vw, 28px);
    }
    .bf-sidebar {
      order: -1;
      padding-top: 0;
      width: 100%;
    }
    .bf-badge {
      width: 100%;
      justify-content: center;
    }
  }

  /* Мобільні */
  @media (max-width: 680px) {
    .bf-title {
      font-size: clamp(18px, 5.5vw, 28px);
      margin-bottom: clamp(16px, 4vw, 22px);
    }
    .bf-slot-hint {
      width: 100%;
      max-width: 100%;
    }
    .bf-cta {
      width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 420px) {
    .bf-badge {
      flex-direction: column;
      border-radius: 20px;
      padding: 14px 18px;
      gap: 10px;
      white-space: normal;
    }
    .bf-badge-item {
      white-space: normal;
      text-align: center;
      justify-content: center;
    }
    .bf-badge-divider {
      width: min(100%, 120px);
      height: 1.5px;
    }
    .bf-success-icon {
      width: 56px;
      height: 56px;
      font-size: 28px;
    }
  }
`;