"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DrawerMenu from "./DrawerMenu";
import { site } from "@/data/site";
import styles from "@/styles/components.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">本文へスキップ</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">{site.siteName}</Link>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-drawer"
          aria-label="メニューを開く"
          onClick={() => setOpen(true)}
        >
          <span className={styles.hamb} aria-hidden="true"><span /><span /><span /></span>
          <span className={styles.menuLabel}>MENU</span>
        </button>
      </header>
      <DrawerMenu open={open} onClose={() => setOpen(false)} returnFocusRef={menuButtonRef} />
    </>
  );
}
