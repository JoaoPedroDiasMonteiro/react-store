import React, { useState } from "react";
import Input from "../../components/ui/input/input.tsx";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                            className="h-10 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Already a member?{' '}
                            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form action="#" method="POST" className="space-y-6">
                                <Input
                                    label="Email address"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    model={[email, setEmail]}
                                />

                                <Input
                                    label="Password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    model={[password, setPassword]}
                                />

                                <Input
                                    label="Password confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    model={[passwordConfirmation, setPasswordConfirmation]}
                                />

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                />
            </div>
        </div>
    )
}
