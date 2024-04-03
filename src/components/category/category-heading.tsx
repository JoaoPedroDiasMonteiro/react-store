import React from "react"
import { Category } from "../../types/Category"

interface CategoryHeadingProps {
    readonly category: Category
}

export default function CategoryHeading({ category }: CategoryHeadingProps) {
    return (
        <div className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto" >
            <div>
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
                        <p aria-hidden="true" className="text-sm text-white">
                            Shop the category
                        </p>
                        <h3 className="mt-1 font-semibold text-white">
                            <a href="#">
                                <span className="absolute inset-0" />
                                {category.name}
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
