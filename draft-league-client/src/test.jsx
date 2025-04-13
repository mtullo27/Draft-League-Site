import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

import SetPic from './components/pokemon/pokemonPic'

import { getCompetitiveData } from './routes/competitiveRoutes'
import { setCompetitiveData, selectCompetitiveData } from './slices/competitiveSlice'


function Test() {
    const dispatch = useDispatch()
    const league = useSelector((state) => state.league)
    const sets = selectCompetitiveData()

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCompetitiveData()
                dispatch(setCompetitiveData(data))
            } catch (error) {
                console.error('Error fetching pokedex data:', error)
            }
        }
        fetchData()
    }, [league.tiers])

    return (
        <>
            <div className="card">
                <h1>Draft League Client</h1>
                <div className="flex flex-row gap-6"> {/* Added gap-6 for spacing */}
                    {
                        sets?.map((pokemon) => (
                            <div key={pokemon.pokemon_name} className="flex flex-col items-center"> {/* Added flex-col for vertical alignment */}
                                <SetPic src={pokemon.sprite_url} alt={pokemon.pokemon_name} />
                                <h2>{pokemon.pokemon_name}</h2> {/* Displaying the Pokemon name */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Test
