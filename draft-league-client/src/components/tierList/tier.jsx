import { useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../pokemon/pokemonCard'

const Tier = ({ tier }) => {
    const pokedex = useSelector((state) => state.pokedex.data)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="tier" onClick={handleClick}>
            <h2>{tier}</h2>
            <div className="pokemon-list">
                {pokedex.filter((pokemon) => {
                    return pokemon.tier_text === tier
                }).map((pokemon) => {
                    return (
                        <div key={pokemon.id}>
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Tier