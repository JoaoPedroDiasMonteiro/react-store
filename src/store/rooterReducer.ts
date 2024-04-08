import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer.ts";
import notificationReducer from "./notification/notificationReducer.ts";
import userReducer from "./user/userReducer.ts";

export const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    cart: cartReducer
})
