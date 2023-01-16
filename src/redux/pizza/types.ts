export type PizzaItem = {
    category: string;
    id: string;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
}

export interface PizzaSliceState {
    items: PizzaItem[];
    loading: boolean;
    error: boolean;
};