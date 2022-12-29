import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import preload from './slices/preloadSlice'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        preload
    },
})