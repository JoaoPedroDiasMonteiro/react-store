import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

interface CartState {
    items: CartItem[];
    quantityItems: number;
    totalValue: number;
    add: (product: Product, quantity?: number) => void;
    remove: (productId: number) => void;
    update: (productId: number, change: number) => void;
}

const INITIAL_VALUE: CartState = {
    items: [],
    quantityItems: 0,
    totalValue: 0,
    add: () => null,
    remove: () => null,
    update: () => null,
};

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    COMPUTE_ITEM_CHANGE: 'COMPUTE_ITEM_CHANGE'
}

export const CartContext = createContext<CartState>(INITIAL_VALUE)

function reducer(state: CartState, action: any) {
    switch (action.type) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            return handleAddToCart(state, action.product, action.quantity)
        }
        case CART_ACTION_TYPES.UPDATE_QUANTITY: {
            return handleUpdateQuantity(state, action.productId, action.change)
        }
        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            return handleRemoveFromCart(state, action.productId)
        }
        case CART_ACTION_TYPES.COMPUTE_ITEM_CHANGE: {
            return computeItemChange(state)
        }
    }

    throw Error('Unknown action: ' + action.type);
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_VALUE, (state) => {
        const items = getCartFromLocalStorage()

        return computeItemChange({ ...state, items })
    })

    const context = useMemo(() => {
        return {
            ...state,
            add: addToCart,
            remove: removeFromCart,
            update: updateQuantity
        }
    }, [state])

    useEffect(() => {
        storeCartOnLocalStorage(state.items)
        dispatch({ type: CART_ACTION_TYPES.COMPUTE_ITEM_CHANGE })
    }, [state.items])

    function addToCart(product: Product, quantity: number = 1) {
        dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, product, quantity })
    };

    function removeFromCart(productId: number): void {
        dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, productId })
    };

    function updateQuantity(productId: number, change: number): void {
        dispatch({ type: CART_ACTION_TYPES.UPDATE_QUANTITY, productId, change })
    };

    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    )
}

function getCartFromLocalStorage(): CartItem[] {
    const items = localStorage.getItem('cart')

    if (items) {
        return JSON.parse(items)
    }

    return []
}

function storeCartOnLocalStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items))
}

function handleAddToCart(state: CartState, product: Product, quantity: number): CartState {
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

    return {
        ...state,
        items: newItems,
    }
}

function handleRemoveFromCart(state: CartState, productId: number): CartState {
    const itemIndex = state.items.findIndex(item => item.id === productId);

    if (itemIndex === -1) {
        return state
    }

    const updatedItems = [...state.items];
    updatedItems.splice(itemIndex, 1);

    return {
        ...state,
        items: updatedItems,
    }
};

function handleUpdateQuantity(state: CartState, productId: number, change: number): CartState {
    const itemIndex = state.items.findIndex(item => item.id === productId);

    if (itemIndex === -1) return state

    const updatedItems = structuredClone([...state.items]);
    const product = updatedItems[itemIndex]

    updatedItems[itemIndex].quantity += change;
    updatedItems[itemIndex].totalPrice = product.price * product.quantity;

    if (updatedItems[itemIndex].quantity <= 0) {
        return state
    };

    return {
        ...state,
        items: updatedItems,
    }
};

function calculateTotalValue(items: CartItem[]) {
    const totalValue = items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return totalValue;
};

function computeItemChange(state: CartState): CartState {
    return {
        ...state,
        quantityItems: state.items.length,
        totalValue: calculateTotalValue(state.items)
    }
}