import React, { createContext, useEffect, useMemo, useState } from "react";
import UserRepository from "../repository/userRepository.ts";
import { User } from "../types/User";

export const UserContext = createContext({
    user: null as null | User,
    setUser: function () { } as Function,
})

export function UserProvider({ children }) {
    const [user, setUser] = useState<null | User>(null)

    useEffect(() => {
        UserRepository.user()
            .then((data) => setUser(data))
            .catch(() => { })
    }, [])

    const context = useMemo(() => {
        return { user, setUser }
    }, [user])

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}
