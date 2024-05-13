import React, { useEffect } from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"
import NotificationContainer from "../components/Notification/NotificationContainer"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import { ProductQuickViewProvider } from "../context/product-quick-view-context"
import UserRepository from "../repository/userRepository"
import { useUserStoreActions } from "../store/user/userStore"

export default function App() {
    const { setUser } = useUserStoreActions()

    useEffect(() => {
        UserRepository.user().then((user) => {
            setUser(user)
        }).catch(() => { })
    }, [])

    return <>
        <ScrollRestoration />
        <NotificationContainer />
        <Header />
        <ProductQuickViewProvider>
            <Outlet />
        </ProductQuickViewProvider>
        <Footer />
    </>
}
