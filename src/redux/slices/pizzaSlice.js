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
    status: 'loading'
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
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer