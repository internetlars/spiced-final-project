export default function reducer(state = {}, action) {
    if (action.type === "FRIEND_REQUESTS") {
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

    return state;
}
