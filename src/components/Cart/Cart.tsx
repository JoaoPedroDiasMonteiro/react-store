import React, { useState } from "react"
import CartModal from "./Modal/CartModal"
import CartToggle from "./CartToggle"

export default function Cart() {
    const [open, setOpen] = useState(false)

    function toggleOpen() {
        setOpen(!open)
    }

    return <>
        <CartToggle onClick={toggleOpen} />
        <CartModal handle={{ open, setOpen }} />
    </>
}