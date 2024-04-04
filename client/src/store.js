import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice'
import apiSlice from "./slices/apiSlice";
import eventApiSlice from "./slices/eventSlice";
import personApiSlice from "./slices/personSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (GetDefaultMiddleware)=>GetDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true

})

export default store