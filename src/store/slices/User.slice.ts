import {createSlice, current, PayloadAction} from '@reduxjs/toolkit'

const savedLocalUser = localStorage.getItem("currentUser")
const savedCurrentUser: userState = savedLocalUser && JSON.parse(localStorage.getItem("currentUser"))

export interface userState {
    idInstance: string;
    apiTokenInstance: string;
}

export const initialState: userState = {
    idInstance: savedCurrentUser ? savedCurrentUser.idInstance : "",
    apiTokenInstance: savedCurrentUser ? savedCurrentUser.apiTokenInstance : ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            state.idInstance = action.payload.idInstance
            state.apiTokenInstance = action.payload.apiTokenInstance

            localStorage.setItem("currentUser", JSON.stringify(current(state)))
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer