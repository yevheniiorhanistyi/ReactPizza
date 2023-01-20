export type Sort = {
    name: string;
    sortProperty: string;
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    pageCount: number;
    sort: Sort;
    currentPage: number;
    itemsOffset: number;
};