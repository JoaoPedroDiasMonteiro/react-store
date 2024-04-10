import React, { useEffect, useState } from "react";
import ProductRepository from "../../../repository/productRepository.ts";
import { Pagination } from "../../../types/Pagination";
import { Product } from "../../../types/Product";
import ProductCardSkeleton from "../../../components/product/product-card-skeleton.tsx";
import ProductCard from "../../../components/product/product-card.tsx";

export default function TrendingProducts() {
    const [products, setProducts] = useState<Pagination<Product>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        const options = {
            limit: 4,
            with: 'category',
            randomOrder: true,
        }

        await ProductRepository.index(options)
            .then((products) => {
                setProducts(products)
            }).catch(() => { })

        setLoading(false)
    }

    if (!loading && !products?.data.length) {
        return null
    }

    return (
        <section aria-labelledby="trending-heading">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Trending Products
                    </h2>
                    <a href="#" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                        <span>Shop the collection</span>
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                    {loading && [...Array(4)].map((value, key) => (
                        <ProductCardSkeleton key={key} />
                    ))}

                    {!loading && products?.data.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>

                <div className="mt-8 text-sm md:hidden">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Shop the collection</span>
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
