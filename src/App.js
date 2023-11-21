import { Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import SkeletonCardList from "./components/SkeletonCardList";
import CardList from "./components/CardList";
import { getPageData, usePokemonData } from "./hooks/usePokemonData";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "./components/Spinner";

export default function App() {
  const queryClient = useQueryClient();

  const initURL = "https://pokeapi.co/api/v2/pokemon";

  const [page, setPage] = useState(1);
  const { data, isFetching } = usePokemonData(initURL, page);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["pokemons", { page: page + 1 }],
      queryFn: () => getPageData(initURL, page + 1),
    });
  }, [page, data.next, queryClient]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  if (isFetching) return <Spinner />;

  return (
    <>
      <Header />
      <section className="w-full h-[100%]">
        <Suspense fallback={<SkeletonCardList />}>
          <CardList data={data.results} page={page} />
        </Suspense>
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={handlePrevPage}
            className="bg-white p-2 rounded-md shadow-md mr-4 disabled:bg-slate-300 disabled:shadow-none"
            disabled={!data.previous && true}
          >
            이전
          </button>
          <button
            onClick={handleNextPage}
            className="bg-white p-2 rounded-md shadow-md disabled:bg-slate-300"
            disabled={!data.next && true}
          >
            다음
          </button>
        </div>
      </section>
    </>
  );
}
