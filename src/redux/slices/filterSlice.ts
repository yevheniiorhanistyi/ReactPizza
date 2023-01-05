import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState = {
    categoryId: 0,
    searchValue: '',
    sort: {
        name: 'Popularność',
        sortProperty: 'rating'
    }
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        }
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions

export default filterSlice.reducer