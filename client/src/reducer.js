export default function reducer(state = {}, action) {
    if (action.type === "FRIEND_REQUEST") {
        state = {
            ...state,
            users: action.users,
        };
        console.log("users: ", action.users);
    }

    if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type === "UN_FRIEND") {
        state = {
            ...state,
            users: state.users.filter((user) => user.id !== action.id),
        };
    }

    if (action.type === "RECENT_MESSAGES") {
        state = {
            ...state,
            chatMessages: [...action.messages],
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.message],
        };
    }
    return state;
}
