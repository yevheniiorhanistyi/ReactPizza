import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios from 'axios';

type PizzaItem = {
    category: string;
    id: string;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
}

interface PizzaSliceState {
    items: PizzaItem[];
    loading: boolean;
    error: boolean;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category } = params;
    const { data } = await axios.get<PizzaItem[]>(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
}
);

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


export const selectItems = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;