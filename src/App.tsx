import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer/footer.tsx"
import Header from "./components/header/header.tsx"

export default function App() {
    return <>
        <Header />
        <Outlet />
        <Footer />
    </>
}
