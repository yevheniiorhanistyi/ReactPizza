import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
    return Number(items.reduce((sum, obj) => obj.price * obj.count + sum, 0).toFixed(2));
};