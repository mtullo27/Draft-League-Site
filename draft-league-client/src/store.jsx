import { configureStore } from '@reduxjs/toolkit'
import { leagueSlice } from './slices/leagueSlice'
import { pokedexSlice } from './slices/pokedexSlice'
import { competitiveSlice } from './slices/competitiveSlice'
import { authSlice } from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    league: leagueSlice.reducer,
    pokedex: pokedexSlice.reducer,
    competitive: competitiveSlice.reducer,
  }
})

export default store
