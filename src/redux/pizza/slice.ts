import { fetchPizzas } from './asyncActions';
import { createSlice } from '@reduxjs/toolkit'
import { PizzaSliceState } from './types';


const initialState: PizzaSliceState = {
    items: [],
    loading: true,
    error: false
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.loading = true;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.error = true;
            state.loading = false;
            state.items = [];
        });
    }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;