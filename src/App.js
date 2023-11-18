import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

export default function App() {
  const initURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

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
      let res = await getAllPokemon(initURL);
      loadPokemon(res.results);
      setNextURL(res.next);
    };
    fetchData();
  }, []);

  const handlePrevPage = async () => {
    if (!prevURL) {
      return;
    }

    let data = await getAllPokemon(prevURL);
    setNextURL(data.next);
    setPrevURL(data.previous);
    loadPokemon(data.results);
  };

  const handleNextPage = async () => {
    if (!nextURL) {
      return;
    }
    let data = await getAllPokemon(nextURL);
    setNextURL(data.next);
    setPrevURL(data.previous);
    loadPokemon(data.results);
  };

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
            className="bg-white p-2 rounded-md shadow-md mr-4 disabled:bg-slate-300"
            disabled={!prevURL && true}
          >
            이전
          </button>
          <button
            onClick={handleNextPage}
            className="bg-white p-2 rounded-md shadow-md disabled:bg-slate-300"
            disabled={!nextURL && true}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
