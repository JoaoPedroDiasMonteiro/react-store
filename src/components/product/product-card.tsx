import React from "react";
import { Product } from "../../types/Product";

interface ProductCardProps {
    readonly product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative">
            <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
                <a href="#">
                    <span className="absolute inset-0" />
                    {product.name}
                </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {product.category?.name}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
            </p>
        </div>
    )
};
