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
  target,
  rel,
  ...rest
}) {
  const cls = ["cta-pill", fullWidth && "cta-pill--full", className].filter(Boolean).join(" ");

  const inner = (
    <>
      {children}
      <span className="cta-pill__arrow" aria-hidden>
        <ArrowIcon variant="blue" height={22} />
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
