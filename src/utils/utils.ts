import {MessageT} from "../store/slices/Messages.slice.ts";

export const localMessage = (text: string, messageId: string): MessageT => {
    return {
        body: {
            idMessage: messageId,
            timestamp: Math.floor(new Date().getTime() / 1000),
            senderData: {
                senderName: "You",
            },
            messageData: {
                textMessageData: {
                    textMessage: text
                }
            }
        }
    }
}

export const getTime = (time: number) => {
    let date = new Date(time * 1000)
    let hours = date.getHours();
    let minutes =  date.getMinutes();
    return (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes
}