import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer.ts";

export const rootReducer = combineReducers({
    user: userReducer
})
