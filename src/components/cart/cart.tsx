import React, { useState } from "react"
import CartModal from "./cart-modal.tsx"
import CartToggle from "./cart-toggle.tsx"

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