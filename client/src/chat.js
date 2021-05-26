import { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export function Chat() {
    return (
        <div className="chat-container">
            <h1>CHAT ROOM</h1>
            <div className="chat-message-container">
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
                <p>blablablabla chat message</p>
            </div>
        </div>
    );
}
