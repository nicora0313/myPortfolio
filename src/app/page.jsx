import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import NewsFeed from "@/components/NewsFeed";
import { site, assetPath } from "@/data/site";

export const metadata = { alternates: { canonical: site.siteUrl } };

export default function HomePage() {
  return <section className="page home-page" data-page="home">
    <section className="home-hero" aria-label="メインビジュアル"><HeroSlider slides={site.home.headerImages} /><div className="home-hero-overlay"><div className="home-copy"><p className="home-eyebrow">{site.home.kicker}</p><h1 className="home-title route-focus-target" tabIndex="-1"><span>{site.home.titleTop}</span><span>{site.home.titleBottom}</span></h1><p className="home-tagline-ja">{site.home.taglineJa}</p><p className="home-description">{site.home.text}</p></div></div></section>
    <div className="home-bottom-row"><section className="home-about-card"><div className="home-about-image"><img src={assetPath(site.home.aboutImage)} alt="ABOUT" loading="lazy" /></div><div><div className="home-section-kicker">ABOUT</div><p className="home-about-ja">{site.home.aboutJa}</p><p className="home-about-en">{site.home.aboutEn}</p><Link className="home-about-link" href="/characters/">MORE →</Link></div></section><section className="home-name-block"><h2 className="home-name-logo">{site.home.credit}</h2><div className="home-name-sub"><span className="line" /><p>{site.home.year}</p></div><p className="home-name-subcopy">{site.home.aboutSubcopy}</p><div className="home-name-tags">{site.home.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section></div>
    <section className="home-selected"><div className="home-selected-head"><div className="label">SELECTED WORKS</div><Link className="home-selected-link" href="/works/">VIEW ALL →</Link></div><div className="home-selected-grid">{site.home.selectedWorks.map((work,index) => <Link className="home-work-card" href="/works/" key={`${work.title}-${index}`}><div className="home-work-thumb"><img src={assetPath(work.image)} alt={work.title} loading="lazy" /></div><div className="home-work-meta"><span className="home-work-no">{String(index+1).padStart(2,'0')}</span><span className="home-work-text"><small>{work.category}</small><b>{work.title}</b><span>{work.sub}</span></span></div></Link>)}</div></section>
    <div className="home-lower"><section className="home-news" aria-labelledby="news-title"><div className="label" id="news-title">NEWS</div><NewsFeed /></section><section className="home-cta"><img className="home-cta-bg" src={assetPath(site.home.contactImage)} alt="" loading="lazy" /><div className="home-cta-body"><div><p className="home-cta-script">{site.home.ctaTitle}</p><p className="home-cta-copy">{site.home.ctaCopy}</p></div><Link className="home-cta-link" href="/stance/">CONTACT →</Link></div></section></div>
    <footer className="home-homefooter"><div className="home-homefooter-brand"><b>{site.home.credit}</b><span>{site.home.aboutSubcopy}</span></div><div className="home-homefooter-copy">{site.footer}</div><div className="home-homefooter-links">{site.socials.map((item) => <a key={item.label} href={item.url}>{item.label}</a>)}</div></footer>
  </section>;
}
