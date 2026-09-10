"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function NewsFeed() {
  const [items, setItems] = useState(site.home.news || []);
  useEffect(() => {
    let cancelled = false;
    // GitHub APIが使えない時も手動NEWSはそのまま表示されます。
    const run = async () => {
      try {
        const base = `https://api.github.com/repos/${site.github.owner}/${site.github.repo}`;
        const paths = [
          ...(site.home.selectedWorks || []).map((w) => ({ path: `public/${w.image}`, text: `【SELECTED WORKS】「${w.title}」を更新しました` })),
        ];
        const results = await Promise.all(paths.map(async (entry) => {
          const res = await fetch(`${base}/commits?path=${encodeURIComponent(entry.path)}&per_page=1`);
          if (!res.ok) return null; const data = await res.json(); const iso = data?.[0]?.commit?.committer?.date; if (!iso) return null;
          const d = new Date(iso); const date = new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(d).replaceAll('/','.');
          return { date, text: entry.text, time: d.getTime() };
        }));
        const manual = (site.home.news || []).map((n) => ({...n,time:new Date(n.date.replaceAll('.','/')).getTime()}));
        const merged = [...manual, ...results.filter(Boolean)].sort((a,b) => b.time-a.time).slice(0,5);
        if (!cancelled && merged.length) setItems(merged);
      } catch {}
    };
    run(); return () => { cancelled = true; };
  }, []);
  return <div className="home-news-list">{items.map((item,i) => <div className="home-news-item" key={`${item.date}-${item.text}-${i}`}><time>{item.date}</time><span>{item.text}</span></div>)}</div>;
}
