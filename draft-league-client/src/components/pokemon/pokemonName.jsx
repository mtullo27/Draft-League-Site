import { useSelector } from "react-redux";

const PokemonName = ({ pokemon_name }) => {
    if (!pokemon_name) {
        return null;
    }

    return (
        <div className="font-sans text-[#5e5e5e]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            <h2 className="text-lg font-semibold">
                {pokemon_name}
            </h2>
        </div>
    );
}

export default PokemonName;