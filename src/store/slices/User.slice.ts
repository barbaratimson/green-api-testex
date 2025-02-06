import {createSlice, current, PayloadAction} from '@reduxjs/toolkit'

export interface userState {
    idInstance: string;
    apiTokenInstance: string;
}


//@ts-ignore
const savedCurrentUser: userState = JSON.parse(localStorage.getItem("teeMeasuresAverages"))


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