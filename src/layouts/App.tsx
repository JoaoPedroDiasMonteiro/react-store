import React, { useEffect } from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"
import NotificationContainer from "../components/Notification/NotificationContainer.tsx"
import Footer from "../components/footer/footer.tsx"
import Header from "../components/header/header.tsx"
import { ProductQuickViewProvider } from "../context/product-quick-view-context.tsx"
import UserRepository from "../repository/userRepository.ts"
import { useUserStoreActions } from "../store/user/userStore.ts"

export default function App() {
    const { setUser } = useUserStoreActions()

    useEffect(() => {
        UserRepository.user()
            .then((user) => {
                setUser(user)
            })
            .catch(() => { })
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
