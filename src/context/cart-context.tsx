import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../types/Product";

interface CartItem extends Product {
    quantity: number,
    totalPrice: number,
}

const INITIAL_VALUE = {
    items: [] as CartItem[],
    quantityItems: 0 as number,
    totalValue: 0 as number,
    add: function () { } as CallableFunction,
    remove: function () { } as CallableFunction,
    update: function () { } as CallableFunction,
}

export const CartContext = createContext(INITIAL_VALUE)

export function CartProvider({ children }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [quantityItems, setQuantityItems] = useState<number>(0)
    const [totalValue, setTotalValue] = useState<number>(0)

    const context = useMemo(() => {
        function addToCart(product: Product, quantity: number = 1) {
            const existingItemIndex = items.findIndex(item => item.id === product.id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...items];
                updatedItems[existingItemIndex].quantity += quantity;
                updatedItems[existingItemIndex].totalPrice = product.price * updatedItems[existingItemIndex].quantity;
                setItems(updatedItems);
            } else {
                const newItem = {
                    ...product,
                    quantity,
                    totalPrice: product.price * quantity
                };
                setItems(prevItems => [...prevItems, newItem]);
            }
        };

        function removeFromCart(productId: number): void {
            const itemIndex = items.findIndex(item => item.id === productId);

            if (itemIndex !== -1) {
                const updatedItems = [...items];
                updatedItems.splice(itemIndex, 1);
                setItems(updatedItems);
            }
        };

        function updateQuantity(productId: number, change: number): void {
            const itemIndex = items.findIndex(item => item.id === productId);

            if (itemIndex === -1) return

            const updatedItems = structuredClone([...items]);
            const product = updatedItems[itemIndex]

            updatedItems[itemIndex].quantity += change;
            updatedItems[itemIndex].totalPrice = product.price * product.quantity;

            if (updatedItems[itemIndex].quantity <= 0) {
                return
            };

            setItems(updatedItems);
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
    }, [items])

    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    )
}
