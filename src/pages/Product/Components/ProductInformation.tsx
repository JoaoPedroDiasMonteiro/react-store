import { CurrencyDollarIcon, GlobeAmericasIcon, StarIcon } from '@heroicons/react/20/solid';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import React from "react";
import { useCartStoreActions } from '../../../store/cart/cartStore.ts';
import { useNotificationStoreActions } from '../../../store/notification/notificationStore.ts';
import { Product } from "../../../types/Product";
import classNames from "../../../utils/classNames.ts";
import moneyFormat from "../../../utils/moneyFormat.ts";

const highlights = [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
]

const policies = [
    { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
    { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

interface ProductInformationProps {
    readonly product: Product
}

export default function ProductInformation({ product }: ProductInformationProps) {
    const { addToCart } = useCartStoreActions()
    const { addNotification } = useNotificationStoreActions()

    function handleAddToCart() {
        addToCart(product, 1)
        notifyProductAdded(product)
    }

    function notifyProductAdded(product: Product) {
        addNotification({
            title: 'Product added successfully',
            body: `The product ${product.name} has been added successfully!`,
            type: 'image',
            imageUrl: product.image,
        })
    }

    return <>
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                    Product information
                </h2>

                <div className="flex items-center">
                    <p className="text-lg text-gray-900 sm:text-xl">{moneyFormat(product.price)}</p>

                    <div className="ml-4 border-l border-gray-300 pl-4">
                        <h2 className="sr-only">Reviews</h2>
                        <div className="flex items-center">
                            <div>
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.price > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="ml-2 text-sm text-gray-500">1289 reviews</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-6">
                    <p className="text-base text-gray-500">{product.description}</p>
                </div>

                {/* <div className="mt-6 flex items-center">
                                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                    <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                                </div> */}
            </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
            </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                    Product options
                </h2>

                <form>
                    {/* Policies */}
                    <section aria-labelledby="policies-heading">
                        <h2 id="policies-heading" className="sr-only">
                            Our Policies
                        </h2>

                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {policies.map((policy) => (
                                <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                    <dt>
                                        <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                    <div className='mt-10'>
                        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                        <div className="mt-4">
                            <ul className="list-disc space-y-2 pl-4 text-sm">
                                {highlights.map((highlight) => (
                                    <li key={highlight} className="text-gray-400">
                                        <span className="text-gray-600">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <button
                            onClick={handleAddToCart}
                            type="button"
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Add to cart
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        <a href="#" className="group inline-flex text-base font-medium">
                            <ShieldCheckIcon
                                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                            <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee {'<'} Modal</span>
                        </a>
                    </div>
                </form>
            </section>
        </div>
    </>
}
