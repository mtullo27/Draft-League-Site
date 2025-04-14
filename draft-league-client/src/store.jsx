import { configureStore } from '@reduxjs/toolkit'
import { leagueSlice } from './slices/leagueSlice'
import { pokedexSlice } from './slices/pokedexSlice'
import { competitiveSlice } from './slices/competitiveSlice'

const store = configureStore({
  reducer: {
    league: leagueSlice.reducer,
    pokedex: pokedexSlice.reducer,
    competitiveSlice: competitiveSlice.reducer,
  }
})

export default store
