import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../pokemon/PokemonList";
import Pagination from "../layout/Pagination";

export default function Dashboard() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        await axios
          .get(currentPageUrl, {
            cancelToken: source.token,
          })
          .then((res) => {
            setLoading(false);
            setNextPageUrl(res.data.next);
            setPrevPageUrl(res.data.previous);
            setPokemon(res.data.results);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }
    };

    fetchData();

    return () => source.cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return <h1> Loading... </h1>;

  return (
    <div className="row">
      <div className="col">
        <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
        <PokemonList pokemon={pokemon} />
      </div>
    </div>
  );
}
