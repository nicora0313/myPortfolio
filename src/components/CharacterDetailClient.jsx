"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import HighResViewer from "./HighResViewer";
import { assetPath } from "@/data/site";

function Placeholder() { return <div className="detail-avatar empty-panel">NO IMAGE</div>; }
function firstVisual(c) { return c.images?.find(Boolean) || c.outfits?.find((x) => x.image)?.image || c.icon || ""; }
function youtubeUrl(url = "") { try { const u = new URL(url); return ["www.youtube.com","youtube.com","www.youtube-nocookie.com"].includes(u.hostname) ? url : ""; } catch { return ""; } }

export default function CharacterDetailClient({ character }) {
  const [mode, setMode] = useState("overview");
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [expressionIndex, setExpressionIndex] = useState(-1);
  const [artworkIndex, setArtworkIndex] = useState(0);
  const [mediaTab, setMediaTab] = useState("movie");
  const [zoomOpen, setZoomOpen] = useState(false);
  const selectedOutfit = character.outfits?.[outfitIndex];
  const selectedExpression = expressionIndex >= 0 ? selectedOutfit?.expressions?.[expressionIndex] : null;
  const stageImage = (typeof selectedExpression === "string" ? selectedExpression : selectedExpression?.image) || selectedOutfit?.image || firstVisual(character);
  const artwork = character.artworks?.[artworkIndex];
  const specs = useMemo(() => [["AGE",character.age],["HEIGHT",character.height],["ROLE",character.role],["COLOR",character.color]].filter(([,v]) => v), [character]);

  return (
    <>
      <Link className="back" href="/characters/">BACK</Link>
      <div className="detail" style={{ "--character-color": character.themeColor || "#2f6bff" }}>
        <div className="profile-actions" aria-label="キャラクターメニュー">
          {[['overview','PROFILE'],['wardrobe','OUTFIT'],['artwork','ART'],['media','MEDIA']].map(([key,label]) => <button type="button" key={key} className={mode === key ? "active" : ""} aria-pressed={mode === key} onClick={() => setMode(key)}>{label}</button>)}
        </div>
        {mode === "overview" && <section className="character-overview">
          <div className="overview-info"><div className="overview-kicker">CHARACTER PROFILE</div><h2>{character.name}</h2><div className="jp">{character.sub}</div><div className="specs">{specs.map(([label,value]) => <div className="spec" key={label}><b>{label}</b><span>{value}</span></div>)}</div><p className="profile-text">{character.text}</p></div>
          <div className="overview-art">{firstVisual(character) ? <img src={assetPath(firstVisual(character))} alt={`${character.name} 立ち絵`} /> : <Placeholder />}</div>
        </section>}
        {mode === "wardrobe" && <section className="wardrobe-editor"><div className="wardrobe-grid"><div className="wardrobe-stage">{stageImage ? <img src={assetPath(stageImage)} alt={`${character.name} 衣装`} /> : <Placeholder />}</div><div className="wardrobe-controls">
          <div className="outfit-list">{(character.outfits || []).length ? character.outfits.map((outfit,i) => <button type="button" key={`${outfit.name}-${i}`} className={`outfit-card ${i === outfitIndex ? "active" : ""}`} onClick={() => { setOutfitIndex(i); setExpressionIndex(-1); }}>{outfit.image ? <img src={assetPath(outfit.image)} alt="" /> : <span>NO IMAGE</span>}<b>{outfit.name}</b></button>) : <div className="empty-panel">NO OUTFIT</div>}</div>
          {selectedOutfit?.expressions?.length ? <div className="expression-list"><button type="button" className={expressionIndex === -1 ? "active" : ""} onClick={() => setExpressionIndex(-1)}>BASE</button>{selectedOutfit.expressions.map((expr,i) => <button type="button" key={i} className={expressionIndex === i ? "active" : ""} onClick={() => setExpressionIndex(i)}>EXP {String(i+1).padStart(2,'0')}</button>)}</div> : null}
        </div></div></section>}
        {mode === "artwork" && <section className="artwork-viewer">{artwork?.image ? <><button type="button" className="artwork-frame" onClick={() => setZoomOpen(true)}><img src={assetPath(artwork.image)} alt={artwork.title} /><span className="artwork-caption">{artwork.title}</span></button><div className="artwork-dots">{(character.artworks || []).map((item,i) => <button type="button" aria-label={item.title} className={i === artworkIndex ? "active" : ""} key={`${item.title}-${i}`} onClick={() => setArtworkIndex(i)} />)}</div></> : <div className="empty-panel">NO ARTWORK</div>}</section>}
        {mode === "media" && <section className="video-viewer"><div className="media-screen-tabs" role="tablist" aria-label="メディア"><button type="button" className={mediaTab === "movie" ? "active" : ""} onClick={() => setMediaTab("movie")}>MOVIE</button><button type="button" className={mediaTab === "music" ? "active" : ""} onClick={() => setMediaTab("music")}>MUSIC</button></div><div className="media-cards">
          {mediaTab === "movie" ? ((character.videos || []).length ? character.videos.map((video,i) => <article className="video-screen-card" key={`${video.title}-${i}`}><div className="video-meta"><b>{video.title}</b><span>{video.sub}</span></div><div className="video-wrap">{video.file ? <video controls preload="metadata" poster={video.poster ? assetPath(video.poster) : undefined}><source src={assetPath(video.file)} /></video> : <div className="media-placeholder">NO VIDEO FILE</div>}</div></article>) : <div className="empty-panel">NO MOVIE</div>) : ((character.music || []).length ? character.music.map((music,i) => { const src = youtubeUrl(music.embedUrl); return <article className="music-screen-card" key={`${music.title}-${i}`}><div className="video-meta"><b>{music.title}</b><span>{music.artist}</span></div>{src ? <iframe src={src} title={`${character.name} - ${music.title}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <div className="media-placeholder">INVALID EMBED URL</div>}</article>; }) : <div className="empty-panel">NO MUSIC</div>)}
        </div></section>}
      </div>
      <HighResViewer open={zoomOpen} src={artwork?.full || artwork?.image} title={artwork?.title || "ARTWORK"} onClose={() => setZoomOpen(false)} />
    </>
  );
}
