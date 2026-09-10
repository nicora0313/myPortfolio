import { ocCharacters } from "@/data/oc";
import { trpgCharacters } from "@/data/trpg";
import { site } from "@/data/site";
export const dynamic = "force-static";
export default function sitemap() { const base = site.siteUrl.endsWith('/') ? site.siteUrl : `${site.siteUrl}/`; const fixed = ['', 'characters/', 'works/', 'stance/'].map((path) => ({ url: new URL(path, base).toString(), changeFrequency: 'monthly', priority: path === '' ? 1 : .8 })); const chars = [...ocCharacters,...trpgCharacters].map((c) => ({ url: new URL(`characters/${c.id}/`, base).toString(), changeFrequency: 'monthly', priority: .7 })); return [...fixed,...chars]; }
