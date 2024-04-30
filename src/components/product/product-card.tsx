import React, { memo, useContext } from "react";
import { ProductQuickViewContext } from "../../context/product-quick-view-context.tsx";
import { Product } from "../../types/Product";

interface ProductCardProps {
    readonly product: Product
}

export default memo(function ProductCard({ product }: ProductCardProps) {
    const { setProduct } = useContext(ProductQuickViewContext)

    function handleClick() {
        setProduct(product)
    }

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
                <button onClick={handleClick}>
                    <span className="absolute inset-0" />
                    {product.name}
                </button>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {product.category?.name}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
            </p>
        </div>
    )
});
