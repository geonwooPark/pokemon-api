import React from "react";

export default function Card({ pokemon }) {
  return (
    <div className="w-[290px] bg-white shadow-[0px_10px_20px_1px_#96adbb] rounded-xl text-center py-4">
      <div>
        <img
          src={pokemon.sprites.front_default}
          alt="pokemon_image"
          className="mx-auto"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{pokemon.name}</h3>
      <div>
        <div>타입</div>
        {pokemon.types.map((type, i) => {
          return (
            <div key={i}>
              <span>{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div>
        <p>무게: {pokemon.weight}</p>
      </div>
      <div>
        <p>키: {pokemon.height}</p>
      </div>
      <div>
        <p>능력: {pokemon.abilities[0].ability.name}</p>
      </div>
    </div>
  );
}
