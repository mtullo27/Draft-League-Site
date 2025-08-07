import SetCard from './setCard';

const SetGroup = ({ sets }) => {
    if (!sets || sets.length === 0) return null;

    // Group sets by pokemon_name and remove any pokemon without sets
    const grouped = sets.reduce((acc, set) => {
        if (!set.smogon_name) return acc; // Skip if smogon_name is missing
        if (!acc[set.smogon_name]) {
            acc[set.smogon_name] = [];
        }
        acc[set.smogon_name].push(set);
        return acc;
    }, {});

    // Remove any pokemon without sets
    Object.keys(grouped).forEach(pokemonName => {
        if (grouped[pokemonName].length <= 1) {
            delete grouped[pokemonName];
        }
    });

    return (
        <div className="space-y-8">
            {Object.entries(grouped).map(([pokemonName, group]) => (
                <div key={pokemonName} className="w-full justify-start rounded-xl shadow-md">
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

export default SetGroup;
