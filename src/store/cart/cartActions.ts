import { CartItem } from "../../types/CartItem"
import { Product } from "../../types/Product"
import { CartState } from "./cartReducer"

export function getCartFromLocalStorage(): CartItem[] {
    const items = localStorage.getItem('cart')

    if (items) {
        return JSON.parse(items)
    }

    return []
}

export function storeCartOnLocalStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items))
}

export function handleAddToCart(state: CartState, product: Product, quantity: number): CartState {
    const items = structuredClone(state.items)

    let newItems: CartItem[] = []

    const existingItemIndex = items.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        newItems = [...items];
        newItems[existingItemIndex].quantity += quantity;
        newItems[existingItemIndex].totalPrice = product.price * newItems[existingItemIndex].quantity;
    } else {
        const newItem = {
            ...product,
            quantity,
            totalPrice: product.price * quantity
        };

        newItems = [...items, newItem]
    }

    return computeItemChange({
        ...state,
        items: newItems,
    })
}

export function handleRemoveFromCart(state: CartState, productId: number): CartState {
    const itemIndex = state.items.findIndex(item => item.id === productId);

    if (itemIndex === -1) {
        return state
    }

    const updatedItems = [...state.items];
    updatedItems.splice(itemIndex, 1);

    return computeItemChange({
        ...state,
        items: updatedItems,
    })
};

export function handleUpdateQuantity(state: CartState, productId: number, change: number): CartState {
    const itemIndex = state.items.findIndex(item => item.id === productId);

    if (itemIndex === -1) return state

    const updatedItems = structuredClone([...state.items]);
    const product = updatedItems[itemIndex]

    updatedItems[itemIndex].quantity += change;
    updatedItems[itemIndex].totalPrice = product.price * product.quantity;

    if (updatedItems[itemIndex].quantity <= 0) {
        return state
    };

    return computeItemChange({
        ...state,
        items: updatedItems,
    })
};

function calculateTotalValue(items: CartItem[]) {
    const totalValue = items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return totalValue;
};

export function computeItemChange(state: CartState): CartState {
    return {
        ...state,
        quantityItems: state.items.length,
        totalValue: calculateTotalValue(state.items)
    }
}
