import './ChatWindow.scss'
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import axios from "axios";
import {forwardRef, memo, useEffect, useRef, useState} from "react";
import {Input} from "../Input/Input.tsx";
import {Button} from "../Button/Button.tsx";
import {SendIcon} from "../../assets/SendIcon.tsx";
import {apiLink} from "../Main/Main.tsx";
import {markReadMessage} from "../../utils/apiRequests.ts";
import {localMessage} from "../../utils/utils.ts";
import {Message, MessageT} from "./Message/Message.tsx";


interface ChatWindowProps {
    chatId: string
}

export const ChatWindow = memo(({chatId}: ChatWindowProps) => {
    const userInfo = useAppSelector(state => state.user)
    const [messageText, setMessageText] = useState<string>("")
    const endAnch = useRef<HTMLDivElement>(null)
    const [chatMessages, setChatMessages] = useState<MessageT[]>([])

    const sendMessage = async () => {
        try {
            const response = await axios.post(
                `${apiLink}/waInstance${userInfo.idInstance}/sendMessage/${userInfo.apiTokenInstance}`, {
                    "chatId": chatId,
                    "message": messageText
                }, {headers: {'Content-Type': 'application/json'}})
            console.log(response.data);
            setChatMessages([...chatMessages, localMessage(messageText, response.data.idMessage)])
        } catch (err) {
            console.error('Error sending message:', err);
            console.log(err)
        }
    }

    return (
        <div className="chat-window">
            <div className="chat-wrapper">
                <div className="chat-header">{chatId}</div>
                <MessagesWindow ref={endAnch} chatMessages={chatMessages} setChatMessages={setChatMessages}
                                chatId={chatId}/>
                <div className="chat-footer">
                    <Input value={messageText} onChange={(e) => {
                        setMessageText(e.target.value)
                    }} placeholder="Start a message"/>
                    <Button className="chat-button-send" onClick={() => {
                        sendMessage().then(() => {
                            setMessageText("")
                        })
                    }}><SendIcon/></Button>
                </div>
                <div className="chat-background"></div>
            </div>
        </div>
    );
});

interface MessagesWindowProps {
    chatMessages: MessageT[]
    setChatMessages: (messages: MessageT[]) => void
    chatId: string
}

const MessagesWindow = ({chatMessages, setChatMessages, chatId}: MessagesWindowProps) => {
    const userInfo = useAppSelector(state => state.user)
    const endAnch = useRef<HTMLDivElement | null>(null)
    const scrollToBottom = () => {
        if (!endAnch.current) return
        endAnch.current?.scrollIntoView({behavior: "smooth"});

    };

    const getMessages = async () => {
        try {
            const response = await axios.get(
                `${apiLink}/waInstance${userInfo.idInstance}/receiveNotification/${userInfo.apiTokenInstance}`);
            return response.data;
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error("Error getting notifications:", err);
            }
        }
    };

    const processIncomingMessages = async () => {
        const incomingMessages = await getMessages();
        if (!incomingMessages) return;

        if (incomingMessages.body.typeWebhook === "incomingMessageReceived") {
           setChatMessages([...chatMessages, incomingMessages])
        } else {
            markReadMessage(incomingMessages.receiptId, userInfo);
        }
    };

    useEffect(() => {
        const interval = setInterval(()=>{
            processIncomingMessages()
        }, 6000);
        return () => {
            clearInterval(interval);
        };
    }, [chatMessages, setChatMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);
    return (
        <div className="chat-messages">
            {chatMessages.length !== 0 && chatMessages.sort((a,b) => a.body.timestamp - b.body.timestamp).map(message => (
                <Message
                    key={message?.body?.idMessage}
                    className={message?.body?.senderData.sender === chatId ? "incoming-message" : "outgoing-message"}
                    message={message}/>
            ))}
            <div ref={endAnch}></div>
        </div>
    )
}

