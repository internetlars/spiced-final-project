//all event listeners sit here for socket.io
import io from "socket.io-client";

//comment out to make project work
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        //comment this out to make project work again
        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        //comment this out to make project work again
        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
    }
};
