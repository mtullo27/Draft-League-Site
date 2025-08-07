import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (code) => {
        const response = await axios.post('/api/auth/discord', { code });
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
