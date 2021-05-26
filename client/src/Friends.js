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

    if (!friends || !requests) {
        return null;
    }
    return (
        <>
            <div className="friends-container">
                <h4>You have {friends.length} friends!</h4>
                <ul>
                    <div>
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
                                    <>
                                        <div>
                                            <Link key={id} to={`/user/${id}`}>
                                                <img
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
                                    </>
                                );
                            })}
                    </div>
                </ul>
            </div>
            <div className="requests-container">
                <h4>You have {requests.length} friend requests.</h4>
                <div>
                    {requests &&
                        requests.map((user) => {
                            const { id, first_name, last_name, img_url } = user;
                            console.log(
                                "user in friend request container: ",
                                user
                            );
                            return (
                                <>
                                    <div>
                                        <Link key={id} to={`/user/${id}`}>
                                            <img
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
                                </>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
