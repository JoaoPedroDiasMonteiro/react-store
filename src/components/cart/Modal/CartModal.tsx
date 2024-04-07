import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useCartStore } from '../../../store/cart/cartStore.ts';
import CartModalFooter from './CartModalFooter.tsx';
import CartModalHeader from './CartModalHeader.tsx';
import CartModalItem from './CartModalItem.tsx';

interface CartModalProps {
    readonly handle: {
        open: boolean,
        setOpen: (value: boolean) => void;
    }
}

export default function CartModal({ handle }: CartModalProps) {
    const { open, setOpen } = handle

    const { items: products, totalValue } = useCartStore()

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <CartModalHeader setOpen={setOpen} />
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul className="-my-6 divide-y divide-gray-200">
                                                        {products.map((product) => (
                                                            <CartModalItem product={product} key={product.id} />
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <CartModalFooter totalValue={totalValue} setOpen={setOpen} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
