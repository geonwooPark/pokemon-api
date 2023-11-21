import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

export const getPageData = async (initURL, page) => {
  const { data } = await axios.get(
    `${initURL}?offset=${20 * (page - 1)}&limit=20`
  );
  return data;
};

export const usePokemonData = (initURL, page) => {
  return useSuspenseQuery({
    queryKey: ["pokemons", { page }],
    queryFn: () => getPageData(initURL, page),
    keepPreviousData: true,
  });
};
