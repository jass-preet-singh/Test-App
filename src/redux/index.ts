import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./user/userSlice";
import tabReducer from "./tab/tabSlice";


const rootReducer = combineReducers({
    user: UserReducer,
    tabs: tabReducer
})

export default rootReducer