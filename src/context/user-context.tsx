import React, { createContext, useEffect, useState } from "react";
import UserRepository from "../repository/userRepository.ts";
import { User } from "../types/User";

export const UserContext = createContext({
    user: null as null | User,
    setUser: function () { } as Function,
})

export function UserProvider({ children }) {
    const [user, setUser] = useState<null | User>(null)

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        try {
            const data = await UserRepository.user()
            setUser(data)
        } catch (error) { }
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
