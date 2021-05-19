//let's import the hooks that we will need
import { useState, useEffect } from "react";

export default function FriendshipButton() {
    //will be rednered inside other profile
    //other profile knows the id of the user that is shown, so we need to pass that info down to the friendshipbutton component via props
    // other profile knows the id from sth like this this.props.match.params.id
    //in useEffect: make request to the server to find out relation between who is logged in and the profile we are viewing
    //based on that, we want to set the value of our button text
    //on clicking of that button, we want to inform the server that there was an update in relation of two users; the one logged in and the one being viewed.

    return (
        <>
            <button className="btn">button will be dynamically set</button>
        </>
    );
}
