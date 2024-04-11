import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useCartStore } from "../../store/cart/cartStore.ts";

export default function CartToggle(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { quantityItems } = useCartStore()

    return (
        <div className="ml-4 flow-root lg:ml-8">
            <button className="group -m-2 flex items-center p-2" {...props}>
                <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{quantityItems}</span>
                <span className="sr-only">items in cart, view bag</span>
            </button>
        </div>
    )
}