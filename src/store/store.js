import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatslice";

const store = configureStore({
    reducer:{
        chat: chatReducer
    }
})

export default store