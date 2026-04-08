/**
 * Горизонтальні поля контенту — як у hero (`HeroSection`) та `.main-nav`.
 */
export const PAGE_GUTTER_X = "clamp(40px, 8vw, 120px)";

/** Максимальна ширина стовпа секційних заголовків (узгоджено з текстовими блоками). */
export const SECTION_TITLE_MAX_WIDTH = "min(100%, 920px)";

/**
 * Типографіка заголовка секцій — обмежена ширина та вирівнювання в тій самій колонці, що й hero.
 */
export const SECTION_INTRO_TITLE = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(32px, 6.5vw, 64px)",
  fontWeight: 900,
  color: "#111",
  textTransform: "uppercase",
  lineHeight: "100%",
  textAlign: "center",
  marginTop: 0,
  marginBottom: "clamp(20px, 3vw, 28px)",
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
  fontSize: "clamp(16px, 2.35vw, 22px)",
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: "133%",
  letterSpacing: 0,
  color: "#000",
  textAlign: "center",
  margin: 0,
};
