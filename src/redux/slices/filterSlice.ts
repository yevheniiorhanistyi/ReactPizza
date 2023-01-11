import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Sort = {
    name: string;
    sortProperty: string;
};

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sort: Sort;
    currentPage: number;
};

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 0,
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
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setSearchValue, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer