import { useSelector } from "react-redux";
import SetPic from "./setPic";

const SetCard = ({ pokemon }) => {
    const sets = useSelector((state) => state.competitive.sets);
    const pokemonData = sets.find((poke) => poke.pokemon_name === pokemon.pokemon_name);

    if (!pokemonData) {
        return null;
    }

    return (
        <div className="flex flex-row justify-center items-center rounded-lg shadow-md">
            <div className="basis-1/3">
                <SetPic src={pokemonData.sprite_url} alt={pokemon.pokemon_name} />
            </div>
        </div>
    );
}

export default SetCard;