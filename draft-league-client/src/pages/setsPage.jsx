import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SetGroup from '../components/competitive/setGroup';
import { getCompetitiveData } from '../routes/competitiveRoutes';
import { setCompetitiveData } from '../slices/competitiveSlice';

const SetsPage = () => {
    const dispatch = useDispatch();
    const sets = useSelector((state) => state.competitive.sets);
    const [search, setSearch] = useState('');
    const [filteredSets, setFilteredSets] = useState([]);

    // Fetch competitive sets on mount
    useEffect(() => {
        async function fetchData() {
            try {
                if (!sets || sets.length === 0) {
                    const data = await getCompetitiveData();
                    dispatch(setCompetitiveData(data));
                }
            } catch (error) {
                console.error('Error fetching competitive data:', error);
            }
        }

        if (!sets || sets.length === 0) {
            fetchData();
        }
    }, [dispatch]);

    // Filter sets by pokemon name
    useEffect(() => {
        if (!search) {
            setFilteredSets(sets);
        } else {
            const lower = search.toLowerCase();
            setFilteredSets(
                sets.filter((set) => set.pokemon_name.toLowerCase().includes(lower) || set.smogon_name.toLowerCase().includes(lower))
            );
        }
    }, [search, sets]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Pokémon Set Browser</h1>

            {/* Search Bar */}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Pokémon name..."
                className="w-full max-w-md mb-6 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <SetGroup sets={filteredSets} />
        </div>
    );
};

export default SetsPage;
