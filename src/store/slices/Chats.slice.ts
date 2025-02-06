import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface chatsState {
    currentChat: string
}

export const initialState: chatsState = {
    currentChat: ""
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {

        setCurrentChat: (state, action: PayloadAction<string>) => {
            state.currentChat = action.payload + "@c.us"
        },
    }
})

export const { setCurrentChat} = chatsSlice.actions

export default chatsSlice.reducer