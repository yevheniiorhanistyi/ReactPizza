import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface PreloadSliceState {
    loading: boolean;
}

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
})

export const selectLoading = (state: RootState) => state.preload;

export const { setLoading } = preloadSlice.actions

export default preloadSlice.reducer