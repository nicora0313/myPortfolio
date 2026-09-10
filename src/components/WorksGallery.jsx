"use client";

import { useMemo, useState } from "react";
import { assetPath } from "@/data/site";
import HighResViewer from "./HighResViewer";

export default function WorksGallery({ works }) {
  const [group, setGroup] = useState("oc"); const [category, setCategory] = useState("rp"); const [selectedIndex, setSelectedIndex] = useState(0); const [zoomOpen, setZoomOpen] = useState(false);
  const visible = useMemo(() => works.filter((work) => work.group === group && (group === "trpg" || work.category === category)), [works, group, category]);
  const safeIndex = Math.min(selectedIndex, Math.max(visible.length - 1, 0)); const selected = visible[safeIndex];
  const changeGroup = (next) => { setGroup(next); setSelectedIndex(0); }; const changeCategory = (next) => { setCategory(next); setSelectedIndex(0); };
  return <><div className="illustration-gallery"><div className="illustration-main">{selected?.image ? <button type="button" className="illustration-main-button" onClick={() => setZoomOpen(true)} aria-label={`${selected.title} を高解像度で表示`}><img src={assetPath(selected.image)} alt={selected.title} /></button> : <div className="illustration-main-placeholder">NO ARTWORK</div>}{selected && <><div className="illustration-main-meta"><b>{selected.title}</b><small>{selected.year}</small></div><div className="illustration-main-hint">TAP TO VIEW HIGH RES</div></>}</div>
    <div className="illustration-strip" aria-label="作品サムネイル">{visible.length ? visible.map((work,i) => <button type="button" key={`${work.title}-${i}`} className={`illustration-thumb ${i === safeIndex ? "active" : ""}`} aria-label={`${work.title}を表示`} aria-pressed={i === safeIndex} onClick={() => setSelectedIndex(i)}>{work.image ? <img src={assetPath(work.image)} alt="" loading="lazy" /> : <span className="illustration-thumb-placeholder">NO IMAGE</span>}<span className="illustration-thumb-label">{work.title}</span></button>) : <div className="illustration-empty">NO ARTWORK</div>}</div>
    <div className="illustration-counter">{visible.length ? `${String(safeIndex+1).padStart(2,'0')} / ${String(visible.length).padStart(2,'0')}` : '00 / 00'}</div>
    <div className="illustration-category-wrap"><div className="illustration-tabs" role="tablist"><button type="button" className={`illustration-tab ${group === 'oc' ? 'active' : ''}`} onClick={() => changeGroup('oc')}>OC</button><button type="button" className={`illustration-tab ${group === 'trpg' ? 'active' : ''}`} onClick={() => changeGroup('trpg')}>TRPG</button></div>{group === 'oc' ? <div className="illustration-subtabs"><button type="button" className={`illustration-subtab ${category === 'rp' ? 'active' : ''}`} onClick={() => changeCategory('rp')}>ORIGINAL RP PROJECT</button><button type="button" className={`illustration-subtab ${category === 'character' ? 'active' : ''}`} onClick={() => changeCategory('character')}>ORIGINAL CHARACTER</button></div> : <div className="illustration-subtabs-placeholder" />}</div></div>
    <HighResViewer open={zoomOpen} src={selected?.full || selected?.image} title={selected?.title || 'ILLUSTRATION'} onClose={() => setZoomOpen(false)} /></>;
}
