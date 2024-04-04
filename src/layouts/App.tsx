import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/footer/footer.tsx"
import Header from "../components/header/header.tsx"
import { ProductQuickViewProvider } from "../context/product-quick-view-context.tsx"
import { CartProvider } from "../context/cart-context.tsx"

export default function App() {
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
