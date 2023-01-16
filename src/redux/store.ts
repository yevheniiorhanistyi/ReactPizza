import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import preload from './preload/slice';
import pizza from './pizza/slice';
import filter from './filter/slice';
import cart from './cart/slice';

const rootReducer = combineReducers({
    preload,
    pizza,
    filter,
    cart,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['preload', 'pizza']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;