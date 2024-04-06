import { User } from '../../types/User';
import { createAction } from '../../utils/reducer/createAction.ts';
import USER_ACTIONS from './userActionTypes.ts';
import { UserState } from './userReducer';
import { useDispatch, useSelector } from "react-redux";

export function useUserStore() {
    const dispatch = useDispatch()

    return {
        ...useSelector((state: any) => state.user) as UserState,
        setUser: (user: User) => {
            dispatch(createAction(USER_ACTIONS.SET_USER, { user }))
        }
    }
}
