import { combineReducers, configureStore } from "@reduxjs/toolkit";

import UserSlice from "./user/UserSlice";

import  { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
//import storage from "redux-persist/lib/storage";

//const rootReducer = combineReducers({user:UserSlice});

// const persistConfig = {
//     key : 'root',
//     version: 1,
//     storage,
// }
//const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore(
    {
    reducer : {user:UserSlice},
    // middlware:(getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck : false,
    // }
    // )
    }
)

//export const persistor = persistStore(store);