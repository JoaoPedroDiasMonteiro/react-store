import React from "react";
import { ProductInterface } from "../../types/Product";

interface ProductProps {
   readonly product: ProductInterface
}

export default function Product({ product }: ProductProps) {
    return (
        <div className="flex flex-col gap-4 bg-white shadow min-w-64 shrink-0 w-[24%] p-6">
            <h2 className="text-lg font-bold line-clamp-1" title={product.title}>{product.title}</h2>
            <img className="aspect-square object-contain" src={product.image} alt={product.title} />
            <p className="text-sm line-clamp-6">{product.description}</p>
            <div className="mt-auto flex justify-between items-center">
                <span className="font-bold">$ {product.price.toFixed(2)}</span>
                <button className="text-indigo-600 text-sm hover:underline">View more</button>
            </div>
        </div>
    )
}