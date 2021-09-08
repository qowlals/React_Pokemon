import "./index.css"
import React, { useState, useEffect } from 'react'
import { PokemonThumnail } from "./Components/PokemonThumnail"

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const response = await fetch(loadMore)
    const data = await response.json()

    setLoadMore(data.next)

    function createPokemonObject(result) {
      result.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data]);

      })
    }
    createPokemonObject(data.results)
    await allPokemons.forEach(pokemon => console.log(pokemon))
  }

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) =>
            <PokemonThumnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />)}
        </div>
        <button onClick={() => getAllPokemons()} className="load-more">Load more</button>
      </div>
    </div>
  );
}

export default App;
