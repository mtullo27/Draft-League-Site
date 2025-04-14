import { createSlice } from '@reduxjs/toolkit';

export const competitiveSlice = createSlice({
    name: 'competitive',
    initialState: {
        sets:[]
    },
    reducers: {
        setCompetitiveData: (state, action) => {
            state.sets = action.payload;
        }
    }
})

export const { setCompetitiveData } = competitiveSlice.actions;

export const selectCompetitiveData = (state) => state.competitive.sets;

export default competitiveSlice.reducer;