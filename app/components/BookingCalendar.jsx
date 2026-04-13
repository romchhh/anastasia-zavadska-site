import { useState, useEffect, useRef } from "react";
import { kyivYmdKey } from "@/lib/kyivDate";
import { SLOT_LABELS } from "@/lib/calendarSlots";

// ─── helpers ──────────────────────────────────────────────────────────────────

const UA_DAYS = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"];
const UA_MONTHS = [
  "січня","лютого","березня","квітня","травня","червня",
  "липня","серпня","вересня","жовтня","листопада","грудня",
];

/** Returns Monday of the week containing `date` */
function getMondayOf(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun … 6 Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** Усі порівняння «сьогодні / минулий день / чи закінчився слот» — за часом Києва */
const KYIV_TZ = "Europe/Kyiv";

function kyivYmd(date) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: KYIV_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const y = Number(parts.find((p) => p.type === "year")?.value);
  const m = Number(parts.find((p) => p.type === "month")?.value);
  const d = Number(parts.find((p) => p.type === "day")?.value);
  return { y, m, d };
}

function ymdEqual(a, b) {
  return a.y === b.y && a.m === b.m && a.d === b.d;
}

function ymdBefore(a, b) {
  if (a.y !== b.y) return a.y < b.y;
  if (a.m !== b.m) return a.m < b.m;
  return a.d < b.d;
}

/** Поточний час у Києві (хвилини від півночі) */
function kyivMinutesSinceMidnight(date = new Date()) {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: KYIV_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });
  const parts = dtf.formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value);
  const min = Number(parts.find((p) => p.type === "minute")?.value);
  return h * 60 + min;
}

function isSameKyivDay(a, b) {
  return ymdEqual(kyivYmd(a), kyivYmd(b));
}

/** День у календарі Києва вже минув (раніше за «сьогодні» в Києві) */
function isPastDay(date) {
  return ymdBefore(kyivYmd(date), kyivYmd(new Date()));
}

/** Понеділок = 0 … неділя = 6 (як у масиві UA_DAYS) */
function uaDayIndex(date) {
  const dow = date.getDay();
  return dow === 0 ? 6 : dow - 1;
}

function dateKey(date, slot) {
  return `${date.toDateString()}__${slot}`;
}

/** Унікальні YYYY-MM (Kyiv) для семи днів тижня (1–2 місяці на переході) */
function monthsCoveringWeek(weekStart) {
  const set = new Set();
  for (let d = 0; d < 7; d++) {
    const day = addDays(weekStart, d);
    set.add(kyivYmdKey(day).slice(0, 7));
  }
  return [...set].sort();
}

/** Парсить "9:00–10:00" (en dash або hyphen) */
function parseSlotRange(slot) {
  const m = String(slot).match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return {
    startH: Number(m[1]),
    startM: Number(m[2]),
    endH: Number(m[3]),
    endM: Number(m[4]),
  };
}

/** Сьогодні (за Києвом) і вікно слота вже закінчилось: зараз у Києві ≥ кінця інтервалу */
function hasSlotWindowEnded(date, slot) {
  const now = new Date();
  if (!ymdEqual(kyivYmd(date), kyivYmd(now))) return false;
  const r = parseSlotRange(slot);
  if (!r) return false;
  const endM = r.endH * 60 + r.endM;
  return kyivMinutesSinceMidnight(now) >= endM;
}

// ─── component ────────────────────────────────────────────────────────────────

const MOBILE_MAX_PX = 680;

export default function BookingCalendar({ onSelect }) {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(getMondayOf(today));
  const [unavailable, setUnavailable] = useState(() => new Set());
  const [slotsByDay, setSlotsByDay] = useState(() => ({}));
  const loadedMonthsRef = useRef(new Set());
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState(null);
  const isMountedRef = useRef(true);
  const [animDir, setAnimDir] = useState(null); // "left" | "right"
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  /** Перемальовує календар, щоб сьогоднішні слоти ставали недоступні після закінчення вікна */
  const [, setTimeTick] = useState(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    const sync = () => setIsMobileLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTimeTick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const needed = monthsCoveringWeek(weekStart);
    const toFetch = needed.filter((m) => !loadedMonthsRef.current.has(m));

    if (toFetch.length === 0) {
      setSlotsLoading(false);
      setSlotsError(null);
      return;
    }

    (async () => {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const results = await Promise.all(
          toFetch.map((month) =>
            fetch(`/api/calendar/slots?month=${encodeURIComponent(month)}`).then(
              async (res) => {
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                  throw new Error(data?.error || "Не вдалося завантажити розклад");
                }
                if (!data.slots || typeof data.slots !== "object") {
                  throw new Error("Некоректна відповідь сервера");
                }
                return data.slots;
              }
            )
          )
        );
        setSlotsByDay((prev) => {
          const merged = { ...prev };
          for (let i = 0; i < toFetch.length; i++) {
            Object.assign(merged, results[i]);
            loadedMonthsRef.current.add(toFetch[i]);
          }
          return merged;
        });
        if (isMountedRef.current) setSlotsLoading(false);
      } catch (e) {
        console.error(e);
        if (isMountedRef.current) {
          setSlotsError(e instanceof Error ? e.message : "Помилка завантаження");
          setSlotsLoading(false);
        }
      }
    })();
  }, [weekStart]);

  useEffect(() => {
    const next = new Set();
    for (let d = 0; d < 7; d++) {
      const day = addDays(weekStart, d);
      const key = kyivYmdKey(day);
      const daySlots = slotsByDay[key];
      if (!Array.isArray(daySlots)) continue;
      daySlots.forEach((item, idx) => {
        const label = SLOT_LABELS[idx];
        if (!label) return;
        if (item && item.available === false) {
          next.add(dateKey(day, label));
        }
      });
    }
    setUnavailable(next);
  }, [weekStart, slotsByDay]);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const visibleDays = isMobileLayout ? days.filter((d) => !isPastDay(d)) : days;

  const mondayThisWeek = getMondayOf(new Date());
  const canGoPrevWeek = weekStart.getTime() > mondayThisWeek.getTime();

  const prevWeek = () => {
    if (!canGoPrevWeek) return;
    setAnimDir("right");
    setTimeout(() => setAnimDir(null), 320);
    setWeekStart((w) => addDays(w, -7));
  };

  const nextWeek = () => {
    setAnimDir("left");
    setTimeout(() => setAnimDir(null), 320);
    setWeekStart(w => addDays(w, 7));
  };

  const selectSlot = (date, slot) => {
    if (slotsLoading || slotsError) return;
    if (isPastDay(date)) return;
    if (hasSlotWindowEnded(date, slot)) return;
    const key = dateKey(date, slot);
    if (unavailable.has(key)) return;

    const payload = { date, slot };
    onSelect?.(payload);
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById("booking-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    });
  };

  const slotState = (date, slot) => {
    if (slotsLoading || slotsError) return "unavailable";
    if (isPastDay(date)) return "unavailable";
    if (hasSlotWindowEnded(date, slot)) return "unavailable";
    if (unavailable.has(dateKey(date, slot))) return "unavailable";
    return "free";
  };

  // Heading date range (на мобільній — лише видимі дні)
  const rangeStart =
    visibleDays.length > 0 ? visibleDays[0] : days[0];
  const rangeEnd =
    visibleDays.length > 0
      ? visibleDays[visibleDays.length - 1]
      : days[6];
  const rangeLabel =
    rangeStart.getMonth() === rangeEnd.getMonth()
      ? `${rangeStart.getDate()}–${rangeEnd.getDate()} ${UA_MONTHS[rangeEnd.getMonth()]} ${rangeEnd.getFullYear()}`
      : `${rangeStart.getDate()} ${UA_MONTHS[rangeStart.getMonth()]} – ${rangeEnd.getDate()} ${UA_MONTHS[rangeEnd.getMonth()]} ${rangeEnd.getFullYear()}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        .bcal-wrap {
          font-family: 'Montserrat', sans-serif;
          width: 100%;
          max-width: none;
          margin: 0 0 clamp(32px, 5vw, 48px);
          padding: 0;
          box-sizing: border-box;
        }

        /* ── header ── */
        .bcal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 12px;
        }
        .bcal-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          color: #6391FF;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 600;
          transition: opacity .15s;
          white-space: nowrap;
        }
        .bcal-nav-btn:hover:not(:disabled) { opacity: .75; }
        .bcal-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }
        .bcal-nav-btn:disabled .bcal-nav-circle {
          background: #b8c4e8;
        }
        .bcal-nav-circle {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: #6391FF;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .15s;
        }
        .bcal-nav-btn:hover .bcal-nav-circle { background: #4a75e8; }
        .bcal-nav-arrow {
          display: block;
          width: clamp(18px, 2.2vw, 26px);
          height: auto;
          object-fit: contain;
        }
        .bcal-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-style: normal;
          font-size: clamp(22px, 5vw, 40px);
          line-height: 104%;
          letter-spacing: 0;
          text-align: center;
          text-transform: uppercase;
          color: #6391FF;
          width: 100%;
          max-width: min(100%, 820px);
          margin: 0 auto;
          box-sizing: border-box;
        }
        .bcal-range {
          font-size: 13px;
          font-weight: 500;
          color: #8fa3d0;
          text-align: center;
          margin-top: 4px;
          margin-bottom: 20px;
        }
        .bcal-slots-hint {
          font-size: 13px;
          font-weight: 500;
          color: #c45c5c;
          text-align: center;
          margin: -12px 0 16px;
          line-height: 1.35;
        }

        /* ── grid ── */
        .bcal-grid-wrap {
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
        }
        .bcal-grid-wrap::-webkit-scrollbar {
          height: 6px;
        }
        .bcal-grid-wrap::-webkit-scrollbar-thumb {
          background: rgba(99, 145, 255, 0.35);
          border-radius: 4px;
        }
        .bcal-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: clamp(8px, 1.2vw, 14px);
          transition: opacity .22s, transform .22s;
        }
        .bcal-grid.anim-left  { animation: slideLeft  .28s ease both; }
        .bcal-grid.anim-right { animation: slideRight .28s ease both; }

        @keyframes slideLeft  { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: none; } }
        @keyframes slideRight { from { opacity:0; transform: translateX(-40px); } to { opacity:1; transform: none; } }

        /* day column */
        .bcal-day-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .bcal-slots {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .bcal-day-label {
          text-align: center;
          min-height: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          padding-bottom: 8px;
        }
        .bcal-day-name {
          font-size: clamp(10px, 1.05vw, 12px);
          font-weight: 800;
          color: #111;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }
        .bcal-day-sub {
          font-size: clamp(11px, 1.15vw, 14px);
          font-weight: 600;
          color: #111;
          line-height: 1.25;
          white-space: nowrap;
        }
        .bcal-day-label .day-num {
          font-size: clamp(13px, 1.45vw, 17px);
          font-weight: 800;
          color: #6391FF;
          margin-right: 2px;
        }
        .bcal-day-month {
          font-weight: 600;
          color: #111;
        }
        .bcal-day-label.today .day-num {
          background: #6391FF;
          color: #fff;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
          vertical-align: middle;
        }
        .bcal-day-label.today .bcal-day-month {
          color: #111;
        }

        /* slot button */
        .bcal-slot {
          border: none;
          border-radius: 14px;
          padding: clamp(16px, 2.2vw, 24px) 6px;
          min-height: 48px;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(10px, 1.05vw, 13px);
          font-weight: 600;
          cursor: pointer;
          transition: background .15s, transform .12s, box-shadow .15s;
          text-align: center;
          line-height: 1.25;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bcal-slot.free {
          background: #dce7ff;
          color: #111;
        }
        .bcal-slot.free:hover:not(:disabled) {
          background: #b9cfff;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(100,145,255,.25);
        }
        .bcal-slot.unavailable {
          background: #e4e4e8;
          color: #5c5c66;
          cursor: not-allowed;
          text-decoration: none;
          border: 1px solid #cfcfd6;
          box-shadow: none;
        }

        /* ── legend ── */
        .bcal-legend {
          display: flex;
          gap: 20px;
          margin-top: 24px;
          flex-wrap: wrap;
          align-items: center;
        }
        .bcal-legend-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; color: #555;
        }
        .bcal-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        /* ── mobile: дні один під одним, слоти сіткою (без горизонтального стиснення 7 колонок) ── */
        @media (max-width: 680px) {
          .bcal-wrap {
            margin-left: 0;
            margin-right: 0;
          }
          .bcal-header {
            gap: 8px;
            margin-bottom: 6px;
          }
          .bcal-title {
            font-size: clamp(16px, 4.5vw, 26px);
            line-height: 1.1;
            padding: 0 4px;
          }
          .bcal-nav-circle {
            width: 44px;
            height: 44px;
          }
          .bcal-nav-btn .bcal-nav-label { display: none; }
          .bcal-range {
            font-size: 12px;
            margin-bottom: 16px;
          }
          .bcal-grid-wrap {
            overflow-x: visible;
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
          }
          .bcal-grid {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }
          .bcal-day-col {
            width: 100%;
            padding: 14px 12px;
            box-sizing: border-box;
            background: #fafbff;
            border: 1px solid rgba(99, 145, 255, 0.14);
            border-radius: 16px;
            gap: 12px;
          }
          .bcal-day-label {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            min-height: 0;
            padding-bottom: 0;
            gap: 8px 12px;
          }
          .bcal-day-name {
            font-size: 12px;
          }
          .bcal-day-sub {
            font-size: 13px;
            white-space: normal;
          }
          .bcal-slots {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            width: 100%;
          }
          .bcal-slot {
            border-radius: 12px;
            padding: 12px 8px;
            min-height: 44px;
            min-width: 0;
            font-size: clamp(10px, 2.8vw, 12px);
          }
          .bcal-legend {
            margin-top: 18px;
            gap: 14px 20px;
            justify-content: center;
          }
          .bcal-legend-item {
            font-size: 12px;
          }
        }

        @media (max-width: 380px) {
          .bcal-slots {
            grid-template-columns: 1fr;
          }
          .bcal-slot {
            font-size: 13px;
          }
        }
      `}</style>

      <div id="booking-calendar" className="bcal-wrap">
        {/* Header */}
        <div className="bcal-header">
          <button
            type="button"
            className="bcal-nav-btn"
            onClick={prevWeek}
            disabled={!canGoPrevWeek}
            aria-label="Попередній тиждень"
          >
            <div className="bcal-nav-circle">
              <img className="bcal-nav-arrow" src="/left.svg" alt="" width={26} height={26} />
            </div>
            <span className="bcal-nav-label">Попередній тиждень</span>
          </button>

          <div>
            <div className="bcal-title">Оберіть дату та час</div>
          </div>

          <button type="button" className="bcal-nav-btn" onClick={nextWeek} aria-label="Наступний тиждень">
            <span className="bcal-nav-label">Наступний тиждень</span>
            <div className="bcal-nav-circle">
              <img className="bcal-nav-arrow" src="/right.svg" alt="" width={26} height={26} />
            </div>
          </button>
        </div>

        <div className="bcal-range">{rangeLabel}</div>
        {slotsError ? (
          <div className="bcal-slots-hint" role="alert">
            {slotsError}. Оновіть сторінку або спробуйте пізніше.
          </div>
        ) : null}
        {slotsLoading ? (
          <div className="bcal-slots-hint" style={{ color: "#8fa3d0" }}>
            Завантаження розкладу…
          </div>
        ) : null}

        {/* Calendar grid */}
        <div className="bcal-grid-wrap">
          <div className={`bcal-grid${animDir ? ` anim-${animDir}` : ""}`}>
            {visibleDays.map((date) => {
              const uaDi = uaDayIndex(date);
              return (
                <div key={kyivYmdKey(date)} className="bcal-day-col">
                  <div className={`bcal-day-label${isSameKyivDay(date, today) ? " today" : ""}`}>
                    <span className="bcal-day-name">{UA_DAYS[uaDi]}</span>
                    <span className="bcal-day-sub">
                      <span className="day-num">{date.getDate()}</span>{" "}
                      <span className="bcal-day-month">{UA_MONTHS[date.getMonth()]}</span>
                    </span>
                  </div>

                  <div className="bcal-slots">
                    {SLOT_LABELS.map((slot) => {
                      const state = slotState(date, slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          className={`bcal-slot ${state}`}
                          onClick={() => selectSlot(date, slot)}
                          disabled={state === "unavailable"}
                          aria-label={`${UA_DAYS[uaDi]} ${date.getDate()} ${UA_MONTHS[date.getMonth()]}, ${slot}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="bcal-legend">
          <div className="bcal-legend-item">
            <div className="bcal-dot" style={{ background: "#dce7ff" }} />
            Вільний час
          </div>
          <div className="bcal-legend-item">
            <div className="bcal-dot" style={{ background: "#e4e4e8", border: "1px solid #cfcfd6" }} />
            Недоступно
          </div>
        </div>

      </div>
    </>
  );
}
