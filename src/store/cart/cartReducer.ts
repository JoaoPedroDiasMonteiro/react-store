import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";

export interface CartState {
    items: CartItem[];
    quantityItems: number;
    totalValue: number;
}

const initialValue = getInitialValue()

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialValue,
    reducers: {
        addToCart(state, action: PayloadAction<{ product: Product, quantity: number }>) {
            const { product, quantity } = action.payload

            const existingItemIndex = state.items.findIndex(item => item.id === product.id);

            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += quantity;
                state.items[existingItemIndex].totalPrice = product.price * state.items[existingItemIndex].quantity;
            } else {
                state.items.push({ ...product, quantity, totalPrice: product.price * quantity })
            }

            storeCartOnLocalStorage(state.items)
            state.quantityItems = state.items.length
            state.totalValue = calculateTotalValue(state.items)
        },
        updateQuantity(state, action: PayloadAction<{ productId: number, change: number }>) {
            const { productId, change } = action.payload

            const itemIndex = state.items.findIndex(item => item.id === productId);

            if (itemIndex === -1) return


            const product = state.items[itemIndex]
            const newQuantity = product.quantity + change

            if (newQuantity <= 0) return

            storeCartOnLocalStorage(state.items)
            product.quantity += change
            product.totalPrice = product.price * product.quantity
            state.totalValue = calculateTotalValue(state.items)
        },
        removeFromCart(state, action: PayloadAction<{ productId: number }>) {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.productId);

            if (itemIndex === -1) return

            state.items.splice(itemIndex, 1);

            storeCartOnLocalStorage(state.items)

            state.quantityItems = state.items.length
            state.totalValue = calculateTotalValue(state.items)
        }
    }
})

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions

export default cartSlice.reducer

function getInitialValue(): CartState {
    const items = getCartFromLocalStorage()

    return {
        items,
        quantityItems: items.length,
        totalValue: calculateTotalValue(items)
    }
}

function getCartFromLocalStorage(): CartItem[] {
    const items = localStorage.getItem('cart')

    if (items) {
        return JSON.parse(items)
    }

    return []
}

function calculateTotalValue(items: CartItem[]) {
    const totalValue = items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return totalValue;
};

function storeCartOnLocalStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items))
}
