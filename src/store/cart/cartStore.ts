import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types/Product';
import { CartState, addToCart, removeFromCart, updateQuantity } from './cartReducer.ts';

export function useCartStore() {
    return {
        ...useSelector((state: any) => state.cart) as CartState
    }
}

export function useCartStoreActions() {
    const dispatch = useDispatch()

    return {
        addToCart: (product: Product, quantity: number = 1) => {
            dispatch(addToCart({ product, quantity }))
        },
        removeFromCart: (productId: number) => {
            dispatch(removeFromCart({ productId }))
        },
        updateItemQuantity: (productId: number, change: number) => {
            dispatch(updateQuantity({ productId, change }))
        }
    }
}
