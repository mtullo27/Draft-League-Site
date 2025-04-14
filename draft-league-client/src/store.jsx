import { configureStore } from '@reduxjs/toolkit'
import { leagueSlice } from './slices/leagueSlice'
import { pokedexSlice } from './slices/pokedexSlice'

const store = configureStore({
  reducer: {
    league: leagueSlice.reducer,
    pokedex: pokedexSlice.reducer
  }

})

export default store
