import { createSlice } from '@reduxjs/toolkit'
import { PreloadSliceState } from './types';

const initialState: PreloadSliceState = {
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
});

export const { setLoading } = preloadSlice.actions

export default preloadSlice.reducer