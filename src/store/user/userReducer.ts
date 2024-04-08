import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './../../types/User.d';

export interface UserState {
    user: User | null
}

const INITIAL_STATE: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer