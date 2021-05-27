import { useState } from "react";
import { useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [inputField, setInputField] = useState("");

    // useEffect(() => {
    //     console.log("useEffect in FindPeople triggered 1!");
    //     axios
    //         .get("/find/users.json")
    //         .then((data) => {
    //             console.log("data.data in axios FindPeople: ", data.data);
    //             setUsers(data.data);
    //         })
    //         .catch((error) =>
    //             console.log("Error caught in FindPeople hook", error)
    //         );
    // }, []);

    useEffect(() => {
        console.log("useEffect in FindPeople triggered 2!");
        let ignore = false;
        if (!inputField) {
            axios
                .get("/find/users.json")
                .then((data) => {
                    console.log("data.data in axios FindPeople: ", data.data);
                    setUsers(data.data);
                })
                .catch((error) =>
                    console.log("Error caught in FindPeople hook", error)
                );
            return;
        }
        (async () => {
            try {
                const { data } = await axios.get("/find/users/" + inputField);
                // .catch((error) => {
                //     console.log("Error caught in useEffect 2: ", error);
                // });
                if (!ignore) {
                    setUsers(data);
                } else {
                    setUsers(data);
                }
            } catch (error) {
                console.log("Error caught in useEffect findPeople: ", error);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [inputField]);

    const onChange = ({ target }) => {
        setInputField(target.value);
    };

    console.log("users: ", users);
    return (
        <div className="search-container">
            <h1>Search</h1>
            <input
                className="search-container-input"
                onChange={onChange}
                placeholder="find a user"
            />
            <ul className="search-card-list">
                {users &&
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <Link
                                    className="search-card-wrapper"
                                    to={`/user/${user.id}`}
                                    key={index}
                                >
                                    <img
                                        className="search-card"
                                        src={
                                            user.img_url ||
                                            "defaultprofilepic.jpeg"
                                        }
                                    />

                                    <p key={user.first_name}>
                                        {user.first_name} {user.last_name}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
            </ul>
        </div>
    );
}
