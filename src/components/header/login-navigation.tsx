import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/user/userStore.ts";

export default function LoginNavigation() {
    const { user } = useUserStore()

    return (
        <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-6">
                    {user && (<>
                        <span className="text-sm font-medium text-white hover:text-gray-100">{user.name}</span>
                        <Link to="/logout" className="text-sm font-medium text-white hover:text-gray-100">
                            Logout
                        </Link>
                    </>)}

                    {!user && (<>
                        <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
                            Sign in
                        </Link>
                        <Link to="/register" className="text-sm font-medium text-white hover:text-gray-100">
                            Create an account
                        </Link>
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}
