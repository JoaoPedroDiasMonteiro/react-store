import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/button";
import Checkbox from "../../components/UI/input/checkbox";
import Input from "../../components/UI/input/input";
import Logo from "../../components/UI/logo";
import UserRepository from "../../repository/userRepository"
import { useNotificationStoreActions } from "../../store/notification/notificationStore"
import { useUserStoreActions } from "../../store/user/userStore"
import { ErrorData } from "../../types/Error"
import getError from "../../utils/getError"
import AuthHero from "./components/auth-hero";
import AuthSocial from "./components/auth-social";

export default function Login() {
    const { setUser } = useUserStoreActions()
    const { addNotification } = useNotificationStoreActions()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<ErrorData>({})

    async function login(event: React.FormEvent) {
        event.preventDefault()

        setLoading(true)

        try {
            await UserRepository.login(form).then((data) => {
                setUser(data)
                addNotification({
                    title: 'Welcome ' + data.name,
                    body: 'You\'ve been logged in.',
                    type: 'success'
                })
                navigate('/')
            })
        } catch (error: any) {
            setErrors(error.response?.data?.errors ?? {})
        }

        setLoading(false)
    }

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Register now
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <form onSubmit={login} className="space-y-6">
                            <Input
                                label="Email address"
                                type="email"
                                autoComplete="email"
                                required
                                model={[form, setForm, 'email']}
                                error={getError(errors, 'email')}
                            />

                            <Input
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                required
                                model={[form, setForm, 'password']}
                                error={getError(errors, 'password')}
                            />

                            <div className="flex items-center justify-between">
                                <Checkbox
                                    label="Remember me"
                                    model={[form, setForm, 'rememberMe']}
                                />

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button type="submit" loading={loading}>
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
