import Link from "next/link";
import { assetPath } from "@/data/site";
import styles from "@/styles/components.module.css";

function Placeholder({ index = 0 }) {
  const colors = ["#7ea2ff", "#96c4ff", "#a6d6ff", "#6385cf"];
  const color = colors[index % colors.length];
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="画像未設定">
      <circle cx="50" cy="50" r="32" fill={color} />
      <circle cx="50" cy="43" r="16" fill="#fff" opacity=".95" />
      <circle cx="44" cy="43" r="2.5" fill="#888" /><circle cx="56" cy="43" r="2.5" fill="#888" />
      <path d="M26 83c4-20 16-30 24-30s20 10 24 30" fill="#909090" />
    </svg>
  );
}

export default function CharacterCard({ character, index = 0 }) {
  return (
    <Link className={`char ${styles.characterCard}`} href={`/characters/${character.id}/`}>
      <div className={`avatar ${styles.avatar}`}>
        {character.icon ? <img src={assetPath(character.icon)} alt={`${character.name} アイコン`} loading="lazy" decoding="async" /> : <Placeholder index={index} />}
      </div>
      <b className={styles.characterName}>{character.name}</b>
      <small className={styles.characterSub}>{character.listSub || ""}</small>
    </Link>
  );
}
