"use client";

import { useMemo, useState } from "react";
import CharacterCard from "./CharacterCard";

export default function CharactersBrowser({ ocCharacters, trpgCharacters }) {
  const [group, setGroup] = useState("oc");
  const [category, setCategory] = useState("character");
  const characters = useMemo(() => group === "oc"
    ? ocCharacters.filter((item) => (item.category || "character") === category)
    : trpgCharacters, [group, category, ocCharacters, trpgCharacters]);

  return (
    <>
      <div className="character-group-tabs" role="tablist" aria-label="キャラクター分類">
        <button type="button" role="tab" aria-selected={group === "oc"} className={`character-group-tab ${group === "oc" ? "active" : ""}`} onClick={() => setGroup("oc")}>OC</button>
        <button type="button" role="tab" aria-selected={group === "trpg"} className={`character-group-tab ${group === "trpg" ? "active" : ""}`} onClick={() => setGroup("trpg")}>TRPG</button>
      </div>
      {group === "oc" ? (
        <div className="character-category-tabs" role="tablist" aria-label="OCカテゴリ">
          <button type="button" role="tab" aria-selected={category === "rp"} className={`character-category-tab ${category === "rp" ? "active" : ""}`} onClick={() => setCategory("rp")}>ORIGINAL RP PROJECT</button>
          <button type="button" role="tab" aria-selected={category === "character"} className={`character-category-tab ${category === "character" ? "active" : ""}`} onClick={() => setCategory("character")}>ORIGINAL CHARACTER</button>
        </div>
      ) : <div className="character-category-placeholder" aria-hidden="true" />}
      <div className="char-grid">
        {characters.length ? characters.map((character, index) => <CharacterCard key={`${group}-${character.id}`} character={character} index={index} />) : <div className="character-category-empty">NO CHARACTER</div>}
      </div>
    </>
  );
}
