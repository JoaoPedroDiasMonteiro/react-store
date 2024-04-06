import { combineReducers } from "redux";
import { notificationReducer } from "./notification/notificationReducer.ts";
import { userReducer } from "./user/userReducer.ts";

export const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer
})
