import api from "../services/api"
import { User } from "../types/User"

const UserRepository = {
    login: async (credentials: { email: string, password: string }): Promise<User> => {
        await api.csrf()

        await api.post('/login', credentials)

        return (await api.get('/api/user')).data
    },
    user: async (): Promise<User> => {
        return (await api.get('/api/user')).data
    }
}

export default UserRepository