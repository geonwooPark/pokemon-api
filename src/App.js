import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const initURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);

  const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let res = await getAllPokemon(initURL);
      console.log(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return <div>포켓몬 데이터</div>;
}
