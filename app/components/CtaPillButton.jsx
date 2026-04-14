import "./CtaPillButton.css";
import { CalendarDays } from "lucide-react";
import { ArrowIcon } from "./ArrowIcon";

/**
 * Кнопка-капсула як у Hero: насичений блакитний фон, білий текст, овал зі стрілкою.
 * З `href` рендериться як `<a>`, інакше — `<button type="button">`.
 */
export default function CtaPillButton({
  children,
  href,
  className = "",
  icon = "arrow",
  fullWidth = false,
  /** Трохи інший відтінок для блоку контактів; compact / compactSolid — менша кнопка (compactSolid — суцільний фон без градієнта) */
  variant = "default",
  target,
  rel,
  ...rest
}) {
  const cls = [
    "cta-pill",
    fullWidth && "cta-pill--full",
    variant === "periwinkle" && "cta-pill--periwinkle",
    variant === "compact" && "cta-pill--compact",
    variant === "compactSolid" && "cta-pill--compact-solid",
    className,
  ].filter(Boolean).join(" ");

  const isCompactLike = variant === "compact" || variant === "compactSolid";
  const arrowHeight =
    isCompactLike ? 16 : variant === "periwinkle" ? 12 : 20;
  const calendarSize =
    isCompactLike ? 18 : variant === "periwinkle" ? 16 : 22;

  const inner = (
    <>
      {children}
      <span
        className={`cta-pill__arrow ${icon === "calendar" ? "cta-pill__arrow--calendar" : ""}`}
        aria-hidden
      >
        {icon === "calendar" ? (
          <CalendarDays className="cta-pill__icon" size={calendarSize} strokeWidth={2.2} />
        ) : (
          <ArrowIcon variant="blue" height={arrowHeight} />
        )}
      </span>
    </>
  );

  if (href != null) {
    return (
      <a href={href} className={cls} target={target} rel={rel} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
