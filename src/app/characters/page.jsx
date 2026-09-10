import PageTitle from "@/components/PageTitle";
import CharactersBrowser from "@/components/CharactersBrowser";
import { ocCharacters } from "@/data/oc";
import { trpgCharacters } from "@/data/trpg";
import { site, absoluteUrl } from "@/data/site";

export const metadata = { title: "OC / TRPG", description: "Original character and TRPG character archive.", alternates: { canonical: `${site.siteUrl}characters/` }, openGraph: { title: `OC / TRPG | ${site.siteName}`, description: "Original character and TRPG character archive.", url: `${site.siteUrl}characters/`, images: [{ url: absoluteUrl(site.defaultOgp), width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title: `OC / TRPG | ${site.siteName}`, description: "Original character and TRPG character archive.", images: [absoluteUrl(site.defaultOgp)] } };
export default function CharactersPage() { return <section className="page subpage character-index-page"><div className="section"><div className="wrap"><PageTitle>OC</PageTitle><CharactersBrowser ocCharacters={ocCharacters} trpgCharacters={trpgCharacters} /></div></div></section>; }
