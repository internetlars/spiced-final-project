import { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => {
        return state && state.chatMessages;
    });
    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    });

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("typing...", event.target.value);
            socket.emit("chatMessage", event.target.value);
            event.target.value = "";
        }
    };

    return (
        <div className="chat-container">
            <h1>CHAT ROOM</h1>
            <div className="chat-message-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message, index) => {
                        const {
                            id,
                            img_url,
                            first_name,
                            last_name,
                            created_at,
                        } = message;
                        return (
                            <div className="anothercontainerinchat" key={index}>
                                <img
                                    className="chat-icon"
                                    src={img_url}
                                    alt={`${first_name} ${last_name}`}
                                />
                                <Link to={`/user/${id}`}>
                                    {" "}
                                    {first_name} {last_name}{" "}
                                </Link>
                                <span>{created_at}</span>
                                <p key={index}>{message.message}</p>
                            </div>
                        );
                    })}
            </div>
            <div>
                <textarea
                    className="chat-textarea"
                    onKeyDown={handleKeyDown}
                    placeholder="type a message!"
                ></textarea>
            </div>
        </div>
    );
}
