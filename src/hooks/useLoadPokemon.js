import { useSuspenseQuery } from "@tanstack/react-query";
import { getFetchData } from "./usePokemonData";

export const getLoadData = async (data) => {
  let result = await Promise.all(
    data.map((pokemon) => {
      let pokemonRecode = getFetchData(pokemon.url);
      return pokemonRecode;
    })
  );
  return result;
};

export const useLoadPokemon = (data, key) => {
  return useSuspenseQuery({
    queryKey: [key, data],
    queryFn: () => getLoadData(data),
  });
};
