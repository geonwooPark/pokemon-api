import { Suspense, startTransition, useEffect, useState } from "react";
import Header from "./components/Header";
import SkeletonCardList from "./components/SkeletonCardList";
import CardList from "./components/CardList";
import { getFetchData, usePokemonData } from "./hooks/usePokemonData";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "./components/Spinner";

export default function App() {
  const queryClient = useQueryClient();

  const [URL, setURL] = useState("https://pokeapi.co/api/v2/pokemon");
  const { data, isFetching } = usePokemonData(URL, "pokemon");

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["pokemon", data.next],
      queryFn: () => getFetchData(data.next),
    });
  }, [URL, data.next, queryClient]);

  const handleNextPage = () => {
    startTransition(() => {
      setURL(data.next);
    });
  };

  const handlePrevPage = () => {
    startTransition(() => {
      setURL(data.previous);
    });
  };

  if (isFetching) return <Spinner />;

  return (
    <>
      <Header />
      <section className="w-full h-[100%]">
        <Suspense fallback={<SkeletonCardList />}>
          <CardList data={data.results} />
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
