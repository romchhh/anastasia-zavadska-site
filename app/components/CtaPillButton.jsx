import "./CtaPillButton.css";
import { ArrowIcon } from "./ArrowIcon";

/**
 * Кнопка-капсула як у Hero: #A8BFFF, білий овал зі стрілкою #92B2FF.
 * З `href` рендериться як `<a>`, інакше — `<button type="button">`.
 */
export default function CtaPillButton({
  children,
  href,
  className = "",
  fullWidth = false,
  /** Світліший перивінкль (#92B2FF) для блоку контактів; compact — менша кнопка (напр. відгуки) */
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

  const arrowHeight = variant === "compact" ? 16 : 22;

  const inner = (
    <>
      {children}
      <span className="cta-pill__arrow" aria-hidden>
        <ArrowIcon
          variant={variant === "periwinkle" ? "periwinkle" : "blue"}
          height={arrowHeight}
        />
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
