import { useDispatch, useSelector } from "react-redux";
import { Notification as BaseNotification } from "../../types/Notification";
import { NotificationState, addNotification, removeNotification } from './notificationReducer.ts';

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
            dispatch(addNotification(notification))
        },
        removeNotification: (notificationId: number) => {
            dispatch(removeNotification(notificationId))
        }
    }
}
