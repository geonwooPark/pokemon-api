import React from "react";
import Card from "./Card";
import { useLoadPokemon } from "../hooks/useLoadPokemon";

export default function CardList({ data, page }) {
  const { data: pokemons } = useLoadPokemon(data, page);

  return (
    <div className="grid grid-cols-3 justify-items-center	gap-5 mt-5">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
