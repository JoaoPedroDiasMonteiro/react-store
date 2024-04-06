import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import Footer from "../components/footer/footer.tsx"
import Header from "../components/header/header.tsx"
import { CartProvider } from "../context/cart-context.tsx"
import { ProductQuickViewProvider } from "../context/product-quick-view-context.tsx"
import UserRepository from "../repository/userRepository.ts"
import USER_ACTIONS from "../store/user/userActionTypes.ts"
import { createAction } from "../utils/reducer/createAction.ts"

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        UserRepository.user()
            .then((response) => {
                dispatch(createAction(USER_ACTIONS.SET_USER, { response }))
            })
            .catch(() => { })
    }, [])

    return <>
        <CartProvider>
            <Header />
            <ProductQuickViewProvider>
                <Outlet />
            </ProductQuickViewProvider>
        </CartProvider>
        <Footer />
    </>
}
