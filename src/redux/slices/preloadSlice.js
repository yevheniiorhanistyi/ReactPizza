import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

export const preloadSlice = createSlice({
    name: 'preload',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
})

export const selectLoading = (state) => state.preload;

export const { setLoading } = preloadSlice.actions

export default preloadSlice.reducer