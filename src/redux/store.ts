import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;