"use client";

import { useState } from "react";

function RichLine({ segments }) { return segments.map((segment,i) => segment.strong ? <strong key={i}>{segment.text}</strong> : <span key={i}>{segment.text}</span>); }
export default function StanceAccordion({ sections }) {
  const [openIndex, setOpenIndex] = useState(null);
  return <div className="stance-list">{sections.map((section,index) => { const open = openIndex === index; const id = `stance-panel-${index}`; return <section className={`stance-item ${section.tone === 'alert' ? 'alert' : ''}`} key={section.no}><button type="button" className="stance-summary" aria-expanded={open} aria-controls={id} onClick={() => setOpenIndex(open ? null : index)}><span className="stance-no">{section.no}</span><span className="stance-summary-text"><span className="stance-summary-title">{section.title}</span><span className="stance-summary-jp">{section.jp}</span></span><span className="stance-toggle" aria-hidden="true" /></button>{open && <div className="stance-body" id={id}>{section.blocks.map((block,i) => block.type === 'heading' ? <h4 key={i}><RichLine segments={block.segments} /></h4> : <p key={i}><RichLine segments={block.segments} /></p>)}</div>}</section>; })}</div>;
}
