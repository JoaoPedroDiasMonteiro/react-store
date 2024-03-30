import React, { useEffect, useState } from "react";
import ProductRepository from "../../repository/ProductRepository.ts";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter.ts";

export default function CategorySelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    const [categories, setCategories] = useState<[string]>()

    useEffect(() => {
        ProductRepository.categories().then((categories) => {
            setCategories(categories)
        })
    }, [])

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
            </label>
            <select
                id="category"
                name="category"
                className="w-48 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                defaultValue="null"
                {...props}
            >
                <option value="">All categories</option>
                {categories?.map(category =>
                    <option value={category}  key={category}>{capitalizeFirstLetter(category)}</option>
                )}
            </select>
        </div>
    )
}