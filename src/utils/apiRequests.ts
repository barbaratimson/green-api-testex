import axios from "axios";
import {apiLink} from "../components/Main/Main.tsx";
import {userState} from "../store/slices/User.slice.ts";

export const markReadMessage = async (receiptId: number, userInfo: userState) => {
    if (receiptId == 0) return
    try {
        const response = await axios.delete(
            `${apiLink}/waInstance${userInfo.idInstance}/deleteNotification/${userInfo.apiTokenInstance}/${receiptId}`);
        return response.data
    } catch (err) {
        throw(err);
    }
}