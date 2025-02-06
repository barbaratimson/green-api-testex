import {useEffect} from "react";
import {useAppSelector} from "../../../store/store.ts";
import './Message.scss'
import {markReadMessage} from "../../../utils/apiRequests.ts";
import {getTime} from "../../../utils/utils.ts";

export interface MessageT {
    "receiptId": number;
    "body": {
        idMessage: string,
        "typeWebhook"?: "incomingMessageReceived",
        "timestamp": number
        "senderData": {
            "sender"?: string,
            "senderName"?: string,
        },
        "messageData": {
            "textMessageData": {
                "textMessage": string
            }
        }
    }
}

interface MessageProps {
    message: MessageT
    className?: string
}


export const Message = ({message, className}: MessageProps) => {

    const userInfo = useAppSelector(state => state.user)

    useEffect(() => {
        if (message.receiptId) {
            markReadMessage(message.receiptId, userInfo)
        }
    }, []);
    return (
        <div className={`message ${className ?? ""}`}>
            <div className="message-text">{message.body.messageData.textMessageData.textMessage}</div>
            <div className="message-time">{getTime(message.body.timestamp)}</div>
        </div>
    );
};