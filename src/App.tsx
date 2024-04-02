import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/header/header.tsx"
import Footer from "./components/footer/footer.tsx"

export default function App() {

  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}
