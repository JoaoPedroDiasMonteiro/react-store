import { User } from '../../types/User';
import { createAction } from '../../utils/reducer/createAction.ts';
import USER_ACTIONS from './userActionTypes.ts';
import { UserState } from './userReducer';
import { useDispatch, useSelector } from "react-redux";

export function useUserStore() {
    return {
        ...useSelector((state: any) => state.user) as UserState,
    }
}

export function useUserStoreActions() {
    const dispatch = useDispatch()

    return {
        setUser: (user: User) => {
            dispatch(createAction(USER_ACTIONS.SET_USER, { user }))
        }
    }
}
