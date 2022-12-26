import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
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
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        }
    },
})

export const { setCategoryId, setSort, setFilters } = filterSlice.actions

export default filterSlice.reducer