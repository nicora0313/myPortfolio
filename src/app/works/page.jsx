import PageTitle from "@/components/PageTitle";
import WorksGallery from "@/components/WorksGallery";
import { works } from "@/data/works";
import { site, absoluteUrl } from "@/data/site";
export const metadata = { title: "ILLUSTRATION", description: "Illustration archive.", alternates: { canonical: `${site.siteUrl}works/` }, openGraph: { title: `ILLUSTRATION | ${site.siteName}`, description: "Illustration archive.", url: `${site.siteUrl}works/`, images: [{ url: absoluteUrl(site.defaultOgp), width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title: `ILLUSTRATION | ${site.siteName}`, description: "Illustration archive.", images: [absoluteUrl(site.defaultOgp)] } };
export default function WorksPage() { return <section className="page subpage illustration-page"><div className="section"><div className="wrap"><PageTitle>ILLUSTRATION</PageTitle><WorksGallery works={works} /></div></div></section>; }
