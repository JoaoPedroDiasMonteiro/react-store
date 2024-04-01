import React from "react"
import ProductList from "./components/Product/ProductList.tsx"
import { Outlet } from "react-router-dom"

export default function App() {

  return <>
    <ProductList />
    <Outlet />
  </>
}
