import React from "react"
import ProductList from "./components/Product/ProductList.tsx"
import { Outlet } from "react-router-dom"
import Header from "./components/header/header.tsx"
import Footer from "./components/footer/footer.tsx"

export default function App() {

  return <>
    <Header />
    {/* <ProductList /> */}
    <Outlet />
    <Footer />
  </>
}
