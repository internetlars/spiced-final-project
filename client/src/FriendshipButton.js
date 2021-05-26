//let's import the hooks that we will need
import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ id }) {
    //will be rednered inside other profile
    //other profile knows the id of the user that is shown, so we need to pass that info down to the friendshipbutton component via props
    // other profile knows the id from sth like this this.props.match.params.id
    //in useEffect: make request to the server to find out relation between who is logged in and the profile we are viewing
    //based on that, we want to set the value of our button text
    //on clicking of that button, we want to inform the server that there was an update in relation of two users; the one logged in and the one being viewed.

    // text of button should be in state
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
            console.log("Error caught in handleSumit: ", error);
        }
    };

    return (
        <>
            <button onClick={handleSubmit} className="btn">
                {/* button will be dynamically set */}
                text
                {buttonText}
            </button>
        </>
    );
}
