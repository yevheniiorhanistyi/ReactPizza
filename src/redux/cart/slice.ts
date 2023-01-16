import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';


const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem && findItem.count > 1) {
                findItem.count--;
            } else {
                state.items = state.items.filter(obj => obj.id !== action.payload)
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer