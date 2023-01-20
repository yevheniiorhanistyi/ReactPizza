import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 0,
    pageCount: 1,
    itemsOffset: 0,
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
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        },
        setItemsOffset(state, action: PayloadAction<number>) {
            state.itemsOffset = action.payload;
        }
    },
});

export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setPageCount, setItemsOffset } = filterSlice.actions

export default filterSlice.reducer