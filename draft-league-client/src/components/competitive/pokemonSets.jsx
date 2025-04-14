import SetCard from './setCard';

const PokemonSets = ({ sets }) => {
    if (!sets || sets.length === 0) return null;

    // Group sets by pokemon_name
    const grouped = sets.reduce((acc, set) => {
        if (!acc[set.smogon_name]) {
            acc[set.smogon_name] = [];
        }
        acc[set.smogon_name].push(set);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            {Object.entries(grouped).map(([pokemonName, group]) => (
                <div key={pokemonName} className="w-full justify-start">
                    {/* Group header */}
                    <h2 className="text-2xl font-bold mb-2">{pokemonName}</h2>
                    
                    {/* Scrollable row of SetCards */}
                    <div className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400">
                        {group.map((set, idx) => (
                            <SetCard key={`${pokemonName}-${idx}`} pokemon={set} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PokemonSets;
