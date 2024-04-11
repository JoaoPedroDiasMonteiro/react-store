import React from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import LoadingSpinner from '../../components/UI/LoadingSpinner.tsx'
import ProductRepository from '../../repository/productRepository.ts'
import { Product } from '../../types/Product'
import ProductInformation from './Components/ProductInformation.tsx'
import Error from '../error.tsx';

export async function productLoader({ params }) {
    const productId = params.product

    try {
        const product = ProductRepository.show(productId)

        return defer({ product })
    } catch (error) {
        throw new Response("Not Found", { status: 404 });
    }
}

export function ProductPage() {
    // @ts-ignore
    const { product } = useLoaderData() as Product

    return (
        <div className="bg-white">
            <React.Suspense fallback={(<div className='min-h-screen'>
                <LoadingSpinner className='absolute inset-0' />
            </div>
            )}>
                <Await resolve={product} errorElement={<Error />}>
                    {(product) => (
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                            <ProductInformation product={product} />
                        </div>
                    )}
                </Await>
            </React.Suspense>
        </div>
    )
}
