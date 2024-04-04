import React, { useEffect, useState } from "react";
import CategoryRepository from "../../../repository/categoryRepository.ts";
import { Category } from "../../../types/Category";
import { Pagination } from "../../../types/Pagination";
import CategoryHeading from "../../category/category-heading.tsx";
import CategoryHeadingSkeleton from "../../category/category-heading-skeleton.tsx";

export default function CollectionHeading() {
    const [categories, setCategories] = useState<Pagination<Category>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        CategoryRepository.index({ limit: 3 }).then((categories) => {
            setCategories(categories)
            setLoading(false)
        }).catch(() => { })
    }, [])

    return (
        <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
            <h2 id="collection-heading" className="sr-only">
                Collections
            </h2>
            <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
                {loading && [...Array(3)].map((value, key) => (
                    <CategoryHeadingSkeleton key={key} />
                ))}

                {categories?.data.map((category) => (
                    <CategoryHeading category={category} key={category.id} />
                ))}
            </div>
        </section>
    )
}
