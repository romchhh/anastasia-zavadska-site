/**
 * Горизонтальні поля контенту — як у hero (`HeroSection`) та `.main-nav`.
 * Трохи компактніше за замовчуванням, щоб при 100% масштабі сторінка не виглядала завеликою.
 */
export const PAGE_GUTTER_X = "clamp(32px, 6.5vw, 96px)";

/** Висота липкого навбару (десктоп) — узгоджено з `.main-nav` у Navbar.jsx */
export const NAV_HEIGHT_DESKTOP = 76;

/** scroll-margin для якорів під липким навбаром */
export const SECTION_SCROLL_MARGIN_TOP = "80px";

/** Максимальна ширина стовпа секційних заголовків (узгоджено з текстовими блоками). */
export const SECTION_TITLE_MAX_WIDTH = "min(100%, 920px)";

/**
 * Типографіка заголовка секцій — обмежена ширина та вирівнювання в тій самій колонці, що й hero.
 */
export const SECTION_INTRO_TITLE = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(26px, 5.5vw, 54px)",
  fontWeight: 900,
  color: "#111",
  textTransform: "uppercase",
  lineHeight: "100%",
  textAlign: "center",
  marginTop: 0,
  marginBottom: "clamp(18px, 2.5vw, 24px)",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  maxWidth: SECTION_TITLE_MAX_WIDTH,
  boxSizing: "border-box",
};

/** Підзаголовки секцій — medium (трохи легше за semibold), по центру */
export const SECTION_INTRO_LEAD = {
  fontFamily: "'Montserrat', sans-serif",
  /** Мінімум трохи вищий для зручності на вузьких екранах */
  fontSize: "clamp(15px, 2vw, 19px)",
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: "133%",
  letterSpacing: 0,
  color: "#000",
  textAlign: "center",
  margin: 0,
};
