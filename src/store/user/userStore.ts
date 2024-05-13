import { User } from '../../types/User';
import { UserState, setUser } from './userReducer';
import { useDispatch, useSelector } from "react-redux";

export function useUserStore() {
    return {
        ...useSelector((state: any) => state.user) as UserState,
    }
}

export function useUserStoreActions() {
    const dispatch = useDispatch()

    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}
