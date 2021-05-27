// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Tab(props) {
    return (
        <div>
            <Link style={{ textDecoration: "none" }} to={props.link}>
                <div className="tab-container">
                    <FontAwesomeIcon
                        style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                        }}
                        color="#6C4B5E"
                        icon={props.icon}
                    />
                    <p className="tab-text">{props.text}</p>
                </div>
            </Link>
        </div>
    );
}
