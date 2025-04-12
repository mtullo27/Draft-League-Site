import { createSlice } from "@reduxjs/toolkit";

export const pokedexSlice = createSlice({
    name: "pokedex",
    initialState:{
        data:[],
        tiers:[]
    },
    reducers:{
        setPokedexData: (state, action) => {
            state.data = action.payload;
        },
        addPokedexData: (state, action) => {
            state.data.push(action.payload);
        },
        removePokedexData: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload.id);
        },
        setTiers: (state, action) => {
            state.tiers = action.payload;
        },
        
    }
})

export const { setPokedexData, addPokedexData, removePokedexData, setTiers } = pokedexSlice.actions;
export const selectPokedexData = (state) => state.pokedex.data;
export const selectPokedexTiers = (state) => state.pokedex.tiers;

export default pokedexSlice.reducer;