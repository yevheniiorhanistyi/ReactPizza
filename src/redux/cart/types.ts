export type CartItem = {
    id: string,
    imageUrl: string,
    price: number,
    title: string,
    type: string,
    count: number
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItem[];
}