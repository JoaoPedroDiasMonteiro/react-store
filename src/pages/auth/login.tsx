import React, { useState } from "react";
import Input from "../../components/ui/input/input.tsx";
import { Link } from "react-router-dom";
import AuthHero from "../../components/auth/auth-hero.tsx";
import AuthSocial from "../../components/auth/auth-social.tsx";
import Logo from "../../components/ui/logo.tsx";
import Button from "../../components/ui/button.tsx";
import Checkbox from "../../components/ui/input/checkbox.tsx";

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Logo />
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Not a member?{' '}
                            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Register now
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
                                autoComplete="current-password"
                                required
                                model={[password, setPassword]}
                            />

                            <div className="flex items-center justify-between">
                                <Checkbox
                                    label="Remember me"
                                    model={[rememberMe, setRememberMe]}
                                />

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button>
                                Sign in
                            </Button>
                        </form>

                        <AuthSocial />
                    </div>
                </div>
            </div>
            <AuthHero />
        </div>
    )
}
