import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category } = params;
    const { data } = await axios.get<PizzaItem[]>(`https://639b4f9ed5141501975219ce.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    );
    return data;
}
);