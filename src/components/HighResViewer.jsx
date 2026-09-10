"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/data/site";

export default function HighResViewer({ open, src, title, onClose }) {
  const [scale, setScale] = useState(1);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    setScale(1);
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("modal-open"); };
  }, [open, onClose]);
  if (!open || !src) return null;
  return (
    <div className="highres-viewer" role="dialog" aria-modal="true" aria-label={`${title} 高解像度表示`}>
      <div className="highres-toolbar"><div className="highres-title">{title}</div><div className="highres-actions">
        <button type="button" onClick={() => setScale((v) => Math.max(.5, v - .25))} aria-label="縮小">−</button><span>{Math.round(scale * 100)}%</span><button type="button" onClick={() => setScale((v) => Math.min(4, v + .25))} aria-label="拡大">＋</button><button ref={closeRef} type="button" onClick={onClose} aria-label="閉じる">×</button>
      </div></div>
      <div className="highres-stage"><img src={assetPath(src)} alt={title} style={{ transform: `scale(${scale})` }} /></div>
      <p className="highres-help">＋ / − で拡大縮小・ESCで閉じる</p>
    </div>
  );
}
