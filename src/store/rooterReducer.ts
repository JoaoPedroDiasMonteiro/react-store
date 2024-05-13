import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer"
import notificationReducer from "./notification/notificationReducer"
import userReducer from "./user/userReducer"

export const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    cart: cartReducer
})
