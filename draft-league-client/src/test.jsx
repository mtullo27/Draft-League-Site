import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

import Tier from './components/tierList/tier'

import { getPokedex } from './routes/pokedexRoutes'
import { setPokedexData, setTiers } from './slices/pokedexSlice'


function Test() {
    const dispatch = useDispatch()
    const league = useSelector((state) => state.league)
    const pokedex = useSelector((state) => state.pokedex)

    useEffect(() => {
        async function fetchPokedexData() {
            try {
                const data = await getPokedex()
                dispatch(setPokedexData(data))
                //select uniquie teir_text from the data and set it to the league slice
                const uniqueTiers = [...new Set(data.map(tier => tier.tier_text).sort((a, b) => b.localeCompare(a, undefined, { numeric: true })))]
                dispatch(setTiers(uniqueTiers))
            } catch (error) {
                console.error('Error fetching pokedex data:', error)
            }
        }
        fetchPokedexData()
    }, [league.tiers])

    return (
        <>
            <div className="card">
                <h1>Draft League Client</h1>
                <div className="flex flex-row gap-6"> {/* Added gap-6 for spacing */}
                    {
                        pokedex.tiers.filter((tier) => tier.localeCompare('99', undefined, { numeric: true })).map((tier) => {
                            return (
                                <div key={tier} className="p-4"> {/* Added padding for additional spacing */}
                                    <Tier tier={tier} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Test
