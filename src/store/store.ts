import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userSlice from "./slices/User.slice.ts";
import chatsSlice from "./slices/Chats.slice.ts";


export const store = configureStore({
    reducer: {
        user: userSlice,
        chats: chatsSlice,
    }
});

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch