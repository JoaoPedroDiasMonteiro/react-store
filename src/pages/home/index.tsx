import React from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import LoadingSpinner from '../../components/ui/LoadingSpinner.tsx'
import CategoryRepository from '../../repository/categoryRepository.ts'
import ProductRepository from '../../repository/productRepository.ts'
import CollectionHeading from './Components/CollectionHeading.tsx'
import TrendingProducts from './Components/TrendingProducts.tsx'
const perks = [
    {
        name: 'Free returns',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
        description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
    },
    {
        name: 'Same day delivery',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
        description:
            'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
        name: 'All year discount',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
        description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
        name: 'For the planet',
        imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
        description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
    },
]

export async function homeLoader() {
    try {
        const trendingProducts = ProductRepository.index({
            limit: 4,
            with: 'category',
            randomOrder: true,
        })
        const categories = CategoryRepository.index({
            limit: 3
        })

        return defer({
            trendingProducts,
            categories
        })
    } catch (error) {
        throw new Response("Not Found", { status: 404 });
    }
}

export default function Home() {
    // @ts-ignore
    const { trendingProducts, categories } = useLoaderData()

    return (
        <div className="bg-white">
            <React.Suspense fallback={(<div className='min-h-screen'>
                <LoadingSpinner className='absolute inset-0' />
            </div>
            )}>
                <main>
                    {/* Hero section */}
                    <div className="relative">
                        {/* Background image and overlap */}
                        <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
                            <div className="relative w-full flex-1 bg-gray-800">
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                                        alt=""
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900 opacity-50" />
                            </div>
                            <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
                        </div>

                        <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
                            {/* Background image and overlap */}
                            <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
                                <div className="relative w-full flex-1 bg-gray-800">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                                            alt=""
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gray-900 opacity-50" />
                                </div>
                                <div className="h-48 w-full bg-white" />
                            </div>
                            <div className="relative py-32">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Mid-Season Sale</h1>
                                <div className="mt-4 sm:mt-6">
                                    <a
                                        href="#"
                                        className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                                    >
                                        Shop Collection
                                    </a>
                                </div>
                            </div>
                        </div>

                        <Await resolve={categories}>
                            {categories => (
                                <CollectionHeading categories={categories} />
                            )}
                        </Await>
                    </div>

                    <Await resolve={trendingProducts}>
                        {products => (
                            <TrendingProducts products={products} />
                        )}
                    </Await>

                    <section aria-labelledby="perks-heading" className="border-t border-gray-200 bg-gray-50">
                        <h2 id="perks-heading" className="sr-only">
                            Our perks
                        </h2>

                        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                                {perks.map((perk) => (
                                    <div
                                        key={perk.name}
                                        className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                                    >
                                        <div className="md:flex-shrink-0">
                                            <div className="flow-root">
                                                <img className="-my-1 mx-auto h-24 w-auto" src={perk.imageUrl} alt="" />
                                            </div>
                                        </div>
                                        <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                            <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                                            <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </React.Suspense>
        </div>
    )
}
