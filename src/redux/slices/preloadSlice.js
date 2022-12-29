import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true
};

export const preloadSlice = createSlice({
    name: 'load',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
})

export const { setLoading } = preloadSlice.actions

export default preloadSlice.reducer