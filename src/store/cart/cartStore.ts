import { Product } from '../../types/Product';
import { createAction } from '../../utils/reducer/createAction.ts';
import { CART_ACTION_TYPES } from './cartActionTypes.ts';
import { CartState } from './cartReducer';
import { useDispatch, useSelector } from 'react-redux';

export function useCartStore() {
    return {
        ...useSelector((state: any) => state.cart) as CartState
    }
}

export function useCartStoreActions() {
    const dispatch = useDispatch()

    return {
        addToCart: (product: Product, quantity: number = 1) => {
            dispatch(createAction(CART_ACTION_TYPES.ADD_TO_CART, { product, quantity }))
        },
        removeFromCart: (productId: number) => {
            dispatch(createAction(CART_ACTION_TYPES.REMOVE_FROM_CART, { productId }))
        },
        updateItemQuantity: (productId: number, change: number) => {
            dispatch(createAction(CART_ACTION_TYPES.UPDATE_QUANTITY, { productId, change }))
        }
    }
}
