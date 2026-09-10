"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import styles from "@/styles/components.module.css";

const navItems = [
  ["HOME", "/"],
  ["OC", "/characters/"],
  ["ILLUSTRATION", "/works/"],
  ["STANCE", "/stance/"],
];

export default function DrawerMenu({ open, onClose, returnFocusRef }) {
  const drawerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return undefined;
    const drawer = drawerRef.current;
    const focusables = [...drawer.querySelectorAll('a[href],button:not([disabled])')];
    focusables[0]?.focus();
    document.body.classList.add("drawer-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        requestAnimationFrame(() => returnFocusRef?.current?.focus());
        return;
      }
      if (event.key !== "Tab" || focusables.length < 2) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("drawer-open");
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <>
      <button
        type="button"
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        aria-label="メニューを閉じる"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        id="site-drawer"
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="サイトメニュー"
        aria-hidden={!open}
      >
        <button className={styles.close} type="button" onClick={onClose} aria-label="メニューを閉じる">×</button>
        <nav className={styles.drawerNav} aria-label="メインナビゲーション">
          {navItems.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
            return (
              <Link key={href} className={`${styles.navItem} ${active ? styles.navActive : ""}`} href={href} aria-current={active ? "page" : undefined}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.socials}>
          {site.socials.map((item) => (
            <a key={item.label} className={styles.social} href={item.url} target={item.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{item.label}</a>
          ))}
        </div>
      </aside>
    </>
  );
}
