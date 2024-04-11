import React from "react";
import CategoryHeading from "../../../components/category/category-heading.tsx";
import { Category } from "../../../types/Category";
import { Pagination } from "../../../types/Pagination";

interface CollectionHeadingProps {
    readonly categories: Pagination<Category>
}

export default function CollectionHeading({ categories }: CollectionHeadingProps) {
    return (
        <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
            <h2 id="collection-heading" className="sr-only">
                Collections
            </h2>
            <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
                {categories.data.map((category) => (
                    <CategoryHeading category={category} key={category.id} />
                ))}
            </div>
        </section>
    )
}
