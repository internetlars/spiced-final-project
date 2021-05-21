//function component
//using useState & useEffect (hooks!)

import { useState } from "react";
import { useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState("");
    const [inputField, setInputField] = useState([]);

    useEffect(() => {
        console.log("useEffect in findPeople triggered");
        let ignore = false;
        (async () => {
            try {
                const { data } = await axios.post("/find/users.json", {
                    inputField,
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
            <input onChange={onChange} />
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
