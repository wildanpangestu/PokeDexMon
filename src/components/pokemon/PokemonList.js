import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemon }) {
  return (
    <div>
      <div className="row">
        {pokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    </div>
  );
}
