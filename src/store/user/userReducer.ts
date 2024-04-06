import { User } from './../../types/User.d';
import USER_ACTIONS from './userActionTypes.ts';
import { setUser } from './userActions.ts';

export interface UserState {
    user: User | null
}

const INITIAL_STATE: UserState = {
    user: null,
}

export function userReducer(state = INITIAL_STATE, action): UserState {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTIONS.SET_USER: {
            return setUser(payload.user)
        }
    }

    return state
}
