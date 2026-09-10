import { notFound } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import CharacterDetailClient from "@/components/CharacterDetailClient";
import { ocCharacters } from "@/data/oc";
import { trpgCharacters } from "@/data/trpg";
import { site, absoluteUrl } from "@/data/site";

const allCharacters = [...ocCharacters, ...trpgCharacters];
function getCharacter(id) { return allCharacters.find((item) => String(item.id) === String(id)); }
function ogpFor(character) { return character.icon || character.artworks?.find((a) => a.full || a.image)?.full || character.artworks?.find((a) => a.image)?.image || site.defaultOgp; }

export function generateStaticParams() {
  return allCharacters.map((character) => ({ id: String(character.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const character = getCharacter(id);
  if (!character) return {};
  const url = `${site.siteUrl}characters/${character.id}/`;
  const image = absoluteUrl(ogpFor(character));
  const description = character.text || character.sub || site.description;
  return {
    title: character.name,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${character.name} | ${site.siteName}`, description, url, type: "profile", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: character.name, description, images: [image] },
  };
}

export default async function CharacterPage({ params }) {
  const { id } = await params;
  const character = getCharacter(id);
  if (!character) notFound();
  return <section className="page subpage character-detail-page"><div className="section"><div className="wrap"><PageTitle>CHARACTER</PageTitle><CharacterDetailClient character={character} /></div></div></section>;
}
