import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TiersPage from './pages/tiersPage'

import { getActiveLeague } from './routes/leagueRoutes'
import { setActiveId } from './slices/leagueSlice'


function Test() {
    const dispatch = useDispatch()
    const league = useSelector((state) => state.league)
    const sets = selectCompetitiveData()

    useEffect(() => {
        async function fetchLeagueData() {
            try {
                const data = await getActiveLeague()
                dispatch(setActiveId(data))
            } catch (error) {
                console.error('Error fetching league data:', error)
            }
        }
        fetchLeagueData()
    }, [])

    return (
        <>
            <>
                <h1>Draft League Client</h1>
                <h2>League: {league.activeId?.active_league_id}</h2>
                <TiersPage />
            </>
        </>
    )
}

export default Test
