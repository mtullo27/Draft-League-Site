import { useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../pokemon/pokemonCard'

const Tier = ({ tier, backgroundColor }) => {
    const pokedex = useSelector((state) => state.pokedex.data)

    return (
        <div className="justify-center justify-items-center items-center rounded-lg shadow-md m-4 border-solid outline-4 outline-[#5e5e5e]" style={{ backgroundColor }}>
            <p className="text-2xl font-bold text-[#5e5e5e]" >{tier}</p>
            <div className="tier-cards" >
                {pokedex.filter((pokemon) => {
                    return pokemon.tier_text === tier
                }).map((pokemon) => {
                    return (
                        <div key={pokemon.id}>
                            <PokemonCard pokemon={pokemon} backgroound={backgroundColor} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Tier