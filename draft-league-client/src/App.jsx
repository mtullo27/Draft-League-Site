import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

import SetPic from './components/pokemon/pokemonPic'

import { getTierData } from './routes/leagueRoutes'
import { setTiers } from './slices/leagueSlice'

import { getPokedex } from './routes/pokedexRoutes'
import { setPokedexData } from './slices/pokedexSlice'

import { setCompetitiveData, selectCompetitiveData } from './slices/competitiveSlice'
import { getCompetitiveData } from './routes/competitiveRoutes'


function App() {
  const dispatch = useDispatch()
  const league = useSelector((state) => state.league)
  const pokedex = useSelector((state) => state.pokedex)

  useEffect(() => {
    async function fetchPokedexData() {
      try {
        const data = await getPokedex()
        const setData = await getCompetitiveData()
        dispatch(setCompetitiveData(setData))
        dispatch(setPokedexData(data))
      } catch (error) {
        console.error('Error fetching pokedex data:', error)
      }
    }
    fetchPokedexData()
  }, [])

async function fetchData() {
  try {
    const data = await getTierData('league-05460626-f230-426f-bb1e-78556e4b0335')
    dispatch(setTiers(data))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
  const handleClick = () => {
    fetchData()
  }

  return (
    <>
      <div className="card">
        <h1>Draft League Client</h1>
        <h2>League</h2>
      </div>
      <div className="card">
        <button onClick={() => handleClick()}>
          {league? "yes" : "no"}
        </button>
      </div>
    </>
  )
}

export default App
