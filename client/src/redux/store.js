import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./user/UserSlice";


export const store = configureStore(
    {
    reducer : {user:UserSlice},
    middlware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    }
    )
    }
)