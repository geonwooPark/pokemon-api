import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

export default function App() {
  const initURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
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
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <div className="w-full h-[100vh]">
        <div className="grid grid-cols-3 justify-items-center	 gap-5 mt-5">
          {pokemonData.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </>
  );
}
