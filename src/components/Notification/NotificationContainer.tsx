import React from 'react'
import { useNotificationStore } from '../../store/notification/notificationStore.ts'
import NotificationItem from './NotificationItem/NotificationItem.tsx'

export default function NotificationContainer() {
    const { notifications } = useNotificationStore()

    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex flex-col gap-4 items-end px-4 py-6 sm:items-start sm:p-6 z-10 transition-all"
        >
            {notifications.map((notification) => (
                <NotificationItem notification={notification} key={notification.id} />
            ))}
        </div>
    )
}
