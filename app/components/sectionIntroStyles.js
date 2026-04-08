/**
 * Типографіка заголовка та підзаголовка секцій — як у блоці «З чим я працюю» (AboutSection).
 */
export const SECTION_INTRO_TITLE = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(32px, 6.5vw, 64px)",
  fontWeight: 900,
  color: "#111",
  textTransform: "uppercase",
  lineHeight: "100%",
  margin: "0 0 clamp(20px, 3vw, 28px) 0",
};

/** Підзаголовки секцій — medium (трохи легше за semibold), по центру */
export const SECTION_INTRO_LEAD = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(14px, 2vw, 22px)",
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: "133%",
  letterSpacing: 0,
  color: "#000",
  textAlign: "center",
  margin: 0,
};
