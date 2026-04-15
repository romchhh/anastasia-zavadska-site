"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/** Миттєвий скрол нагору без анімації (сумісність з усіма браузерами) */
function scrollTopInstant() {
  window.scrollTo(0, 0);
}

/**
 * Після client navigation: якщо в URL є #якір — прокрутка до id; інакше — на початок сторінки.
 * Інакше Next.js інколи залишає позицію скролу з попереднього маршруту (сторінка відкривається «з середини»).
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) {
      scrollTopInstant();
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        scrollTopInstant();
      }
    });
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const { hash } = window.location;
      if (!hash || hash.length < 2) {
        scrollTopInstant();
        return;
      }
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
