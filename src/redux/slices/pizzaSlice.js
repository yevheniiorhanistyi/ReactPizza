import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category } = params;
    const { data } = await axios.get(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
}
)

const initialState = {
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
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.error = true;
            state.loading = false;
            state.items = [];
        }
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer