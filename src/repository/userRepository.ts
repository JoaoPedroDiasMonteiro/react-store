import api from "../services/api.ts"

const userRepository = {
    login: async (credentials: {email: string, password: string}) => {
        await api.csrf()

        await api.post('/login', credentials)

        await api.get('/api/user')
    }
}

export default userRepository