"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteFocus() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => document.querySelector("main h1")?.focus({ preventScroll: true }));
  }, [pathname]);
  return null;
}
