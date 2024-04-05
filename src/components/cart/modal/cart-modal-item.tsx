import React, { useContext } from "react"
import { CartContext } from "../../../context/cart-context.tsx"
import { CartItem } from "../../../types/CartItem"
import moneyFormat from "../../../utils/moneyFormat.ts"

interface CartModalItemProps {
    product: CartItem
}

export default function CartModalItem({ product }: CartModalItemProps) {
    const { update, remove } = useContext(CartContext)

    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="#">{product.name}</a>
                            <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
                        </h3>
                        <div className='text-right'>
                            <p className="ml-4">
                                <span className='text-sm'>{product.quantity}x {' '}</span>
                                <span>{moneyFormat(product.price)}</span>
                            </p>
                            <hr />
                            <p className="ml-4">{moneyFormat(product.totalPrice)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className='flex items-center gap-2'>
                        <button className='h-5 w-5 text-white flex items-center justify-center bg-slate-400 rounded-full'
                            onClick={() => update(product.id, -1)}
                        >
                            <span className='h-[22px]'>&#8722;</span>
                        </button>
                        <p className="text-gray-500">Qty: {product.quantity}</p>
                        <button className='h-5 w-5 text-white flex items-center justify-center bg-slate-400 rounded-full'
                            onClick={() => update(product.id, 1)}
                        >
                            <span className='h-[22px]'>&#43;</span>
                        </button>
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => { remove(product.id) }}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}