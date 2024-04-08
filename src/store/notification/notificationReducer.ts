import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Notification } from './../../types/Notification.d';

export interface NotificationState {
    notifications: Notification[]
}

const INITIAL_STATE: NotificationState = {
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: INITIAL_STATE,
    reducers: {
        addNotification(state, action: PayloadAction<any>) {
            const notification = action.payload

            notification.id = Date.now()
            notification.duration ??= 3456

            state.notifications.push(notification)
        },
        removeNotification(state, action: PayloadAction<number>) {
            state.notifications.filter((notification) => {
                return notification.id !== action.payload
            })
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer