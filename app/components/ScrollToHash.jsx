"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget() {
  if (typeof window === "undefined") return;
  const { hash } = window.location;
  if (!hash || hash.length < 2) return;
  const id = decodeURIComponent(hash.slice(1));
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/** Після client navigation на сторінку з #якорем прокручує до відповідного id. */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHashTarget();
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHashTarget();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
