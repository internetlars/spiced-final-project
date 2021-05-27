//navbar component
import React from "react";
import { Link } from "react-router-dom";
// import { Component } from "react";
// import axios from "./axios";

export default function NavBar() {
    return (
        <div className="navbar">
            {/* <div className="navbarLeft"></div>
            <div className="navbarCenter"></div>
            <div className="navbarRight"></div> */}
            <div>
                <Link to="/chat">chat</Link>
            </div>
            <div>
                <Link to="/user">your profile</Link>
            </div>
            <div>
                <Link to="/find/users">find other users</Link>
            </div>
        </div>
    );
}
