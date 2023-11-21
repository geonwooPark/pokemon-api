import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

export const getFetchData = async (url) => {
  const { data } = await axios.get(`${url}`);
  return data;
};

export const usePokemonData = (url, key) => {
  return useSuspenseQuery({
    queryKey: [key, url],
    queryFn: () => getFetchData(url),
    keepPreviousData: true,
  });
};
