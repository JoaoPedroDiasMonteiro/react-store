import { CartItem } from "../../types/CartItem";
import { CART_ACTION_TYPES } from "./cartActionTypes.ts";
import { computeItemChange, getCartFromLocalStorage, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity } from "./cartActions.ts";

export interface CartState {
    items: CartItem[];
    quantityItems: number;
    totalValue: number;
}

function getInitialValue(): CartState {
    const items = getCartFromLocalStorage()

    return computeItemChange({
        items,
        quantityItems: 0,
        totalValue: 0
    })
}

const initialValue = getInitialValue()

export function cartReducer(state: CartState = initialValue, action: any) {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            return handleAddToCart(state, payload.product, payload.quantity)
        }
        case CART_ACTION_TYPES.UPDATE_QUANTITY: {
            return handleUpdateQuantity(state, payload.productId, payload.change)
        }
        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            return handleRemoveFromCart(state, payload.productId)
        }
    }

    return state
}
