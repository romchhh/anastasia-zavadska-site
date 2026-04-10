import "./CtaPillButton.css";
import { ArrowIcon } from "./ArrowIcon";

/**
 * Кнопка-капсула як у Hero: насичений блакитний фон, білий текст, овал зі стрілкою.
 * З `href` рендериться як `<a>`, інакше — `<button type="button">`.
 */
export default function CtaPillButton({
  children,
  href,
  className = "",
  fullWidth = false,
  /** Трохи інший відтінок для блоку контактів; compact — менша кнопка (напр. відгуки) */
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
    className,
  ].filter(Boolean).join(" ");

  const arrowHeight =
    variant === "compact" ? 16 : variant === "periwinkle" ? 12 : 20;

  const inner = (
    <>
      {children}
      <span className="cta-pill__arrow" aria-hidden>
        <ArrowIcon variant="blue" height={arrowHeight} />
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
