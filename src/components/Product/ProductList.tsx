import React, { useEffect, useMemo, useState } from "react";
import { ProductInterface } from "../../types/Product";
import Product from "./Index.tsx";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ProductRepository from "../../repository/ProductRepository.ts";
import CategorySelect from "../Category/CategorySelect.tsx";
import Input from "../UI/Input.tsx";
import EmptyStateMessage from "../UI/EmptyStateMessage.tsx";

interface ProductListProps {
    readonly className?: null | string
}

export default function ProductList({ className }: ProductListProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [category, setCategory] = useState<null | string>(null)
    const [products, setProducts] = useState<ProductInterface[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setLoading(true)

        ProductRepository.products(category).then((products) => {
            setProducts(products)
            setLoading(false)
        })
    }, [category])

    useEffect(() => {
        setSearch('')
    }, [products])

    const filteredProducts = useMemo(() => {
        if (!search) {
            return products
        }

        return products?.filter((product) => {
            return product.title.toLowerCase().indexOf(search.toLowerCase()) > -1
                || product.description.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    }, [search, products])

    return <>
        <LoadingIndicator show={loading} />

        <div className="flex items-center gap-4">
            <CategorySelect onChange={(event) => setCategory(event.target.value)} />
            <Input
                value={search}
                label="Search"
                model={setSearch}
                placeholder="Mens Cotton Jacket"
                type="search"
            />
        </div>

        <div className={className + ' mx-auto flex flex-wrap gap-2 mt-4'}>
            {filteredProducts.map((product) =>
                <Product product={product} key={product.id} />
            )}
        </div>

        {!filteredProducts.length && (
            <EmptyStateMessage name="products" className="mt-4" />
        )}
    </>
}