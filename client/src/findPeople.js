import { useState } from "react";
import { useEffect } from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [inputField, setInputField] = useState("");

    useEffect(() => {
        console.log("useEffect in FindPeople triggered 1!");
        axios
            .get("/find/users")
            .then((data) => {
                console.log("data.data in axios FindPeople: ", data.data);
                setUsers(data.data);
            })
            .catch((error) =>
                console.log("Error caught in FindPeople hook", error)
            );
    }, []);

    useEffect(() => {
        console.log("useEffect in FindPeople triggered 2!");
        let ignore = false;
        (async () => {
            try {
                const { data } = await axios
                    .get(`/find/users/${inputField}`)
                    .catch((error) => {
                        console.log("Error caught in useEffect 2: ", error);
                    });
                if (!ignore) {
                    setUsers(data);
                } else {
                    setUsers([]);
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

    return (
        <div className="search-container">
            <h3>Search for other users</h3>
            <input onChange={onChange} placeholder="find a user" />
            <ul>
                {users &&
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={
                                        user.img_url || "defaultprofilepic.jpeg"
                                    }
                                />

                                <p key={user.firstName}>
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>
                        );
                    })}
            </ul>
            {/* ... */}

            {users.map((user) => (
                <div key={user.id}>{/* ... */}</div>
            ))}

            {/* ... */}
        </div>
    );
}
