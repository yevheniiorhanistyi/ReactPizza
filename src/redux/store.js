import { configureStore } from '@reduxjs/toolkit';

import preload from './slices/preloadSlice'
import pizza from './slices/pizzaSlice';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        preload,
        pizza,
        filter,
        cart,
    },
})