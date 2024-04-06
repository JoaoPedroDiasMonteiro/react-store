import { Notification } from "../../types/Notification";
import { NotificationState } from "./notificationReducer";

export function addNotification(state: NotificationState, notification: Notification): NotificationState {
    notification.id ??= Date.now()
    notification.duration ??= 3456

    return {
        notifications: [...state.notifications, notification]
    }
}

export function removeNotification(state: NotificationState, notificationId: number): NotificationState {
    const notifications = state.notifications.filter((notification) => {
        return notification.id !== notificationId
    })

    return { notifications }
}
