import { useDispatch, useSelector } from "react-redux";
import { Notification as BaseNotification } from "../../types/Notification";
import { createAction } from "../../utils/reducer/createAction.ts";
import NOTIFICATION_TYPES from "./notificationActionTypes.ts";
import { NotificationState } from './notificationReducer';

interface Notification extends Omit<BaseNotification, 'id' | 'duration'> {
    duration?: number
}

export function useNotificationStore() {
    return {
        ...useSelector((state: any) => state.notification) as NotificationState,
    }
}

export function useNotificationStoreActions() {
    const dispatch = useDispatch()

    return {
        addNotification: (notification: Notification) => {
            dispatch(createAction(NOTIFICATION_TYPES.ADD_NOTIFICATION, { notification }))
        },
        removeNotification: (notificationId: number) => {
            dispatch(createAction(NOTIFICATION_TYPES.REMOVE_NOTIFICATION, { notificationId }))
        }
    }
}
