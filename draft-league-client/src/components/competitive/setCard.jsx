import SetPic from "./setPic";

const SetCard = ({ pokemon }) => {
    if (!pokemon) return null;

    const sprite_url = "/assets/trimmed" + pokemon.sprite_file_path.slice(1).replace(/\\/g, "/");

    const formatStats = (stats) =>
        Object.entries(stats || {})
            .filter(([stat, val]) => val !== undefined && val !== 0)
            .map(([stat, val]) => `${val} ${stat.toUpperCase()}`)
            .join(" / ");

    return (
        <div className="flex flex-col w-full max-w-md rounded-xl shadow-md p-4 m-2 min-w-[355px]">
            {/* Set Name */}
            <h2 className="text-xl font-bold mb-2">{pokemon.set_name}</h2>

            <div className="flex flex-row gap-4 items-start">
                {/* Sprite */}
                <div className="w-24 h-24 flex items-center justify-center">
                    <SetPic src={sprite_url} alt={pokemon.pokemon_name} />
                </div>

                {/* Set Info */}
                <div className="flex flex-col space-y-1 text-sm">
                    {/* Name and Item */}
                    <p className="font-semibold">
                        {pokemon.pokemon_name}{pokemon.item ? ` @ ${pokemon.item}` : ""}
                    </p>

                    {/* Ability */}
                    {pokemon.ability && (
                        <p>Ability: <span className="text-gray-700">{pokemon.ability}</span></p>
                    )}

                    {/* Tera Type */}
                    {pokemon.tera_type && (
                        <p>Tera Type: <span className="text-gray-700">{pokemon.tera_type}</span></p>
                    )}

                    {/* EVs */}
                    {pokemon.evs && (
                        <p>EVs: <span className="text-gray-700">{formatStats(pokemon.evs)}</span></p>
                    )}

                    {/* Nature */}
                    {pokemon.nature && (
                        <p><span className="text-gray-700">{pokemon.nature} Nature</span></p>
                    )}

                    {/* IVs (only show if custom) */}
                    {pokemon.ivs && Object.values(pokemon.ivs).some(val => val !== 31) && (
                        <p>IVs: <span className="text-gray-700">{formatStats(pokemon.ivs)}</span></p>
                    )}

                    {/* Moves */}
                    {pokemon.moves?.length > 0 && (
                        <ul className="list-disc list-inside mt-1">
                            {pokemon.moves.map((move, idx) => (
                                <li key={idx}>{move}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SetCard;
