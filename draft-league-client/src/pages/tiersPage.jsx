import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TierList from '../components/tierList/tierList'

import { getPokedex } from '../routes/pokedexRoutes'
import { setPokedexData, setTiers } from '../slices/pokedexSlice'


function TiersPage() {
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
    }, [])

    return (
        <>
            <>
                <h1>Draft League Client</h1>
                <TierList pokedex={pokedex} />
            </>
        </>
    )
}

export default TiersPage
