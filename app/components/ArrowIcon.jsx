/**
 * Стрілки з public/bluearrow.svg та public/whirearrow.svg
 */

const BLUE = "/bluearrow.svg";
const PERIWINKLE = "/periwinkle-arrow.svg";
const WHITE = "/whirearrow.svg";

/** Праворуч; `direction="left"` — дзеркально для «назад». */
export function ArrowIcon({ variant = "blue", direction = "right", height = 18, className, style }) {
  const src =
    variant === "white" ? WHITE : variant === "periwinkle" ? PERIWINKLE : BLUE;
  const flip = direction === "left" ? "scaleX(-1)" : undefined;
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={className}
      style={{
        display: "block",
        height,
        width: "auto",
        objectFit: "contain",
        flexShrink: 0,
        transform: flip,
        ...style,
      }}
    />
  );
}

/**
 * Навбар / футер: синя стрілка; при hover кнопки — біла (globals.css).
 */
export function DualRoundArrow({ height = 14 }) {
  const center = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height,
    width: "auto",
    objectFit: "contain",
    display: "block",
  };
  return (
    <span
      className="dual-round-arrow-wrap"
      style={{
        position: "relative",
        display: "inline-block",
        width: height * 1.78,
        height,
        flexShrink: 0,
        verticalAlign: "middle",
      }}
    >
      <img src={BLUE} alt="" aria-hidden draggable={false} className="dual-round-arrow--blue" style={center} />
      <img
        src={WHITE}
        alt=""
        aria-hidden
        draggable={false}
        className="dual-round-arrow--white"
        style={{ ...center, display: "none" }}
      />
    </span>
  );
}
