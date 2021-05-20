//function component
//using useState & useEffect (hooks!)

import { useState } from "react";
import { useEffect } from "react";
import axios from "./axios";

export default function findPeople() {
    const [users, setUsers] = useState("");
    const [inputField, setInputField] = useState([]);

    useEffect(() => {
        console.log("useEffect in findPeople triggered");
        axios.get("/findusers").then((data) => {
            setUsers(data.data);
        })
        .catch ((error) => {
                console.log("Error caught in useEffect findPeople: ", error);
            }

    });

     return (
        <div>
            {/* ... */}

            {users.map(
                user => (
                    <div key={user.id}>
                        {/* ... */}
                    </div>
                )
            )}

            {/* ... */}
        </div>
    );
}
