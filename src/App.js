import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

export default function App() {
  const initURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllPokemon = (url) => {
    return new Promise((resolve) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const getPokemon = (url) => {
    return new Promise((resolve) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  const loadPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecode = getPokemon(pokemon.url);
        return pokemonRecode;
      })
    );
    setPokemonData(pokemonData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await getAllPokemon(initURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePrevPage = async () => {
    if (!prevURL) {
      return;
    }

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    setNextURL(data.next);
    setPrevURL(data.previous);
    loadPokemon(data.results);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextURL) {
      return;
    }

    setLoading(true);
    let data = await getAllPokemon(nextURL);
    setNextURL(data.next);
    setPrevURL(data.previous);
    loadPokemon(data.results);
    setLoading(false);
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <div className="w-full h-[100%]">
        <div className="grid grid-cols-3 justify-items-center	gap-5 mt-5">
          {pokemonData.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={handlePrevPage}
            className="bg-white p-2 rounded-md shadow-[0px_10px_20px_1px_#96adbb] mr-4 disabled:bg-slate-300"
            disabled={!prevURL && true}
          >
            이전
          </button>
          <button
            onClick={handleNextPage}
            className="bg-white p-2 rounded-md shadow-[0px_10px_20px_1px_#96adbb] disabled:bg-slate-300"
            disabled={!nextURL && true}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
