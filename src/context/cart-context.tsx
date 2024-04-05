import React, { createContext, useEffect, useMemo, useState } from "react";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

const INITIAL_VALUE: {
    items: CartItem[];
    quantityItems: number;
    totalValue: number;
    add: (product: Product, quantity: number) => void;
    remove: (productId: number) => void;
    update: (productId: number, change: number) => void;
} = {
    items: [],
    quantityItems: 0,
    totalValue: 0,
    add: function (product: Product, quantity: number): void { },
    remove: function (productId: number): void { },
    update: function (productId: number, change: number): void { }
};

export const CartContext = createContext(INITIAL_VALUE)

export function CartProvider({ children }) {
    const [items, setItems] = useState<CartItem[]>(getCartFromLocalStorage())
    const [quantityItems, setQuantityItems] = useState<number>(0)
    const [totalValue, setTotalValue] = useState<number>(0)

    const context = useMemo(() => {
        function addToCart(product: Product, quantity: number = 1) {
            setItems(handleAddToCart(items, product, quantity))
        };

        function removeFromCart(productId: number): void {
            setItems(handleRemoveFromCart(items, productId))
        };

        function updateQuantity(productId: number, change: number): void {
            setItems(handleUpdateQuantity(items, productId, change));
        };

        return {
            items,
            quantityItems,
            totalValue,
            add: addToCart,
            remove: removeFromCart,
            update: updateQuantity
        }
    }, [items, quantityItems, totalValue])

    useEffect(() => {
        function calculateTotalValue() {
            const totalValue = items.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
            return totalValue;
        };

        setQuantityItems(items.length)
        setTotalValue(calculateTotalValue)
        storeCartOnLocalStorage(items)
    }, [items])

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

function handleAddToCart(items: CartItem[], product: Product, quantity: number): CartItem[] {
    const existingItemIndex = items.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].totalPrice = product.price * updatedItems[existingItemIndex].quantity;

        return updatedItems
    }

    const newItem = {
        ...product,
        quantity,
        totalPrice: product.price * quantity
    };

    return [...items, newItem]
}

function handleRemoveFromCart(items: CartItem[], productId: number): CartItem[] {
    const itemIndex = items.findIndex(item => item.id === productId);

    if (itemIndex === -1) {
        return items
    }

    const updatedItems = [...items];
    updatedItems.splice(itemIndex, 1);

    return updatedItems
};

function handleUpdateQuantity(items: CartItem[], productId: number, change: number): CartItem[] {
    const itemIndex = items.findIndex(item => item.id === productId);

    if (itemIndex === -1) return items

    const updatedItems = structuredClone([...items]);
    const product = updatedItems[itemIndex]

    updatedItems[itemIndex].quantity += change;
    updatedItems[itemIndex].totalPrice = product.price * product.quantity;

    if (updatedItems[itemIndex].quantity <= 0) {
        return items
    };

    return updatedItems
};