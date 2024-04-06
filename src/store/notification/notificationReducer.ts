import { Notification } from './../../types/Notification.d';
import NOTIFICATION_TYPES from "./notificationActionTypes.ts";
import { addNotification, removeNotification } from "./notificationActions.ts";

export interface NotificationState {
    notifications: Notification[]
}

const INITIAL_STATE: NotificationState = {
    notifications: []
}

export function notificationReducer(state: NotificationState = INITIAL_STATE, action: any) {
    const { type, payload } = action

    switch (type) {
        case NOTIFICATION_TYPES.ADD_NOTIFICATION: {
            return addNotification(state, payload.notification)
        }
        case NOTIFICATION_TYPES.REMOVE_NOTIFICATION: {
            return removeNotification(state, payload.notificationId)
        }
    }

    return state
}
