import React, { useState } from "react";
import Input from "../../components/ui/input/input.tsx";
import { Link } from "react-router-dom";
import AuthHero from "../../components/auth/auth-hero.tsx";
import Button from "../../components/ui/button.tsx";
import Logo from "../../components/ui/logo.tsx";

export default function Register() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Logo />
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

                            <Button>
                                Sign up
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <AuthHero />
        </div>
    )
}
