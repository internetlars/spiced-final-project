import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ id }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/connection/${id}`);
                console.log("data in useEffect Friendshipbutton: ", data);
                setButtonText(data.dynamicButtonText);
            } catch (error) {
                console.log(
                    "Error caught in useEffect hook for friendship button: ",
                    error
                );
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/connection", {
                dynamicButtonText: buttonText,
                viewedUser: id,
            });
            setButtonText(data.dynamicButtonText);
        } catch (error) {
            console.log("Error caught in handleSubmit: ", error);
        }
    };

    const handleDecline = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/connection", {
                dynamicButtonText: "Decline friend request",
                viewedUser: id,
            });
            setButtonText("Add as a friend");
        } catch (error) {
            console.log("Error in declining: ", error);
        }
    };

    return (
        <>
            <button onClick={handleSubmit} className="btn">
                {buttonText}
            </button>
            {buttonText === "Accept" && (
                <button onClick={handleDecline}>Decline friend request</button>
            )}
        </>
    );
}
