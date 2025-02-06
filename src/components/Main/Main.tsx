import './Main.scss'
import {ChatWindow} from "../ChatWindow/ChatWindow.tsx";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {useState} from "react";
import {setCurrentChat} from "../../store/slices/Chats.slice.ts";
import {setUser, userState} from "../../store/slices/User.slice.ts";
import {UserIcon} from "../../assets/UserIcon.tsx";
import {Input} from "../Input/Input.tsx";
import {Button} from "../Button/Button.tsx";
import {ArrowIcon} from "../../assets/ArrowIcon.tsx";
import {LockIcon} from "../../assets/LockIcon.tsx";

export const apiLink = import.meta.env.VITE_REACT_APP_API_LINK

function Main() {
    const currentChat = useAppSelector(state => state.chats.currentChat)
    const dispatch = useAppDispatch()
    const [chat, setChat] = useState("")
    const user = useAppSelector(state => state.user)
    const [inputHidden, setInputHidden] = useState(true)
    const setUserFunc = (user: userState) => dispatch(setUser(user))

    const setCurrentChatFunc = (chatId: string) => dispatch(setCurrentChat(chatId))

    return (
        <div className="app-wrapper">
            {currentChat ? (
                <ChatWindow chatId={currentChat}/>
            ) : (
                <div className="chat-intro">
                    <div className="chat-authorize">
                        <UserIcon/>
                        <div>Authorize user</div>
                        <Input placeholder="Instance ID" value={user.idInstance} onChange={(e) => {
                            setUserFunc({...user, idInstance: e.target.value})
                        }}></Input>
                        <div className="chat-authorize-token">
                            <Input placeholder="API Token" type={inputHidden ? "password" : "text"} value={user.apiTokenInstance}
                                   onChange={(e) => {
                                       setUserFunc({...user, apiTokenInstance: e.target.value})
                                   }}></Input>
                            <Button className="chat-authorize-lock-button" onClick={() => {
                                setInputHidden(!inputHidden)
                            }}><LockIcon/></Button>
                        </div>
                    </div>
                    <div className="chat-start-chat">
                        <div>Start new chat</div>
                        <div className="chat-start-input-group">
                            <Input value={chat} placeholder="Phone number" type="number" onChange={(e) => {
                                setChat(e.target.value)
                            }}/>
                            <Button onClick={() => {
                                setCurrentChatFunc(chat)
                            }}><ArrowIcon/></Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main
