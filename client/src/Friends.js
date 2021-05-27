//function component
// import { CardActions } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { acceptFriend, getFriendRequests, unFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    const requests = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted === false)
    );

    useEffect(() => {
        (!friends || !requests) && dispatch(getFriendRequests());
    }, []);

    // if (!friends || !requests) {
    //     return null;
    // }
    return (
        <>
            <div>
                <h2>You have {friends && friends.length} friends!</h2>
                <ul>
                    <div className="friends-container">
                        {friends &&
                            friends.map((user) => {
                                const {
                                    id,
                                    first_name,
                                    last_name,
                                    img_url,
                                } = user;
                                console.log(
                                    "user in friends container: ",
                                    user
                                );
                                return (
                                    <div key={id}>
                                        <Link key={id} to={`/user/${id}`}>
                                            <img
                                                className="friends-card"
                                                key={img_url}
                                                src={
                                                    img_url ||
                                                    "defaultprofilepic.jpeg"
                                                }
                                                alt={`${first_name} ${last_name}`}
                                            />
                                        </Link>
                                        <p key={first_name}>
                                            {first_name} {last_name}
                                        </p>
                                        {/* button can't be as in part 8! */}
                                        <button
                                            key={unFriend}
                                            onClick={() =>
                                                dispatch(unFriend(id))
                                            }
                                        >
                                            Defriend
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </ul>
            </div>
            <br></br>
            <div>
                <h2>...and {requests && requests.length} friend requests!</h2>
                <div className="requests-container">
                    {requests &&
                        requests.map((user) => {
                            const { id, first_name, last_name, img_url } = user;
                            console.log(
                                "user in friend request container: ",
                                user
                            );
                            return (
                                <div key={id}>
                                    <Link key={id} to={`/user/${id}`}>
                                        <img
                                            className="requests-card"
                                            key={img_url}
                                            src={
                                                img_url ||
                                                "defaultprofilepic.jpeg"
                                            }
                                            alt={`${first_name} ${last_name}`}
                                        />
                                    </Link>
                                    <p>
                                        {first_name} {last_name}
                                    </p>
                                    <button
                                        key={acceptFriend}
                                        onClick={() =>
                                            dispatch(acceptFriend(id))
                                        }
                                    >
                                        Decline
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
