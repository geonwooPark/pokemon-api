import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const getPokemonData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const getLoadData = async (data) => {
  let result = await Promise.all(
    data.map((pokemon) => {
      let pokemonRecode = getPokemonData(pokemon.url);
      return pokemonRecode;
    })
  );
  return result;
};

export const useLoadPokemon = (data, page) => {
  return useSuspenseQuery({
    queryKey: ["loadedPokemons", { page }],
    queryFn: () => getLoadData(data),
  });
};
