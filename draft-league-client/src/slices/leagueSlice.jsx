import { createSlice } from "@reduxjs/toolkit";

export const leagueSlice = createSlice({
    name: "league",
    initialState: {
        info: [],
        roster: [],
        tiers: [],
        tier_values:[]
    },
    reducers: {
        setLeagueInfo: (state, action) => {
            state.info = action.payload;
        },
        setRoster: (state, action) => {
            state.roster = action.payload;
        },
        setTiers: (state, action) => {
            state.tiers = action.payload; 
        },
        setTierValues: (state, action) => {
            state.tier_values = action.payload; 
        },
    }
})

export const { setLeagueInfo, setRoster, setTiers, setTierValues } = leagueSlice.actions;

export const selectLeagueInfo = (state) => state.league.info;
export const selectRoster = (state) => state.league.roster;
export const selectTiers = (state) => state.league.tiers;
export const selectTierValues = (state) => state.league.tier_values;

export default leagueSlice.reducer;
