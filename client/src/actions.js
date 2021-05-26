import axios from "./axios";

export async function getFriendRequests() {
    try {
        const { data } = await axios.get("/friendrequests.json");
        console.log("data in actions:", data);
        return {
            type: "FRIEND_REQUEST",
            users: data,
        };
    } catch (error) {
        console.log(
            "Error caught in actions: GET route getFriendRequests:",
            error
        );
    }
}

export async function acceptFriend(userId) {
    const dynamicButtonText = "Accept";
    try {
        await axios.post("/connections.json", {
            viewedUser: userId,
            dynamicButtonText,
        });
        return {
            type: "ACCEPT_FRIEND",
            userId,
        };
    } catch (error) {
        console.log(
            "Error caught in actions: GET route for acceptFriend:",
            error
        );
    }
}

export async function unFriend(userId) {
    const dynamicButtonText = "Unfriend";
    try {
        await axios.post("/connections.json", {
            otherUser: userId,
            dynamicButtonText,
        });
        return {
            type: "UN_FRIEND",
            userId,
        };
    } catch (error) {
        console.log(
            "Error caught in the actions: GET route for unFriend:",
            error
        );
    }
}
