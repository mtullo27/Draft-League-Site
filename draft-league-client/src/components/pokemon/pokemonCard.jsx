import { useSelector } from "react-redux";
import PokemonName from "./pokemonName";
import PokemonPic from "./pokemonPic";

const PokemonCard = ({ pokemon }) => {
    const pokedex = useSelector((state) => state.pokedex.data);
    const pokemonData = pokedex.find((poke) => poke.id === pokemon.id);

    if (!pokemonData) {
        return null;
    }

    return (
        <div className="flex flex-row justify-center items-center rounded-lg shadow-md">
            <div className="basis-1/3">
                <PokemonPic src={pokemonData.sprite_url} alt={pokemon.pokemon_name} />
            </div>
            <div className="basis-2/3 flex flex-col justify-center items-start">
                <PokemonName pokemon_name={pokemon.pokemon_name} />
            </div>
        </div>
    );
}

export default PokemonCard;