// import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
// import ResetPassword from "./passwordreset";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then(({ data }) => {
                // console.log("data: ", data);
                if (data.success) {
                    location.replace("/");
                } else {
                    console.log("error!");
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    handleChange({ target }) {
        // console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        console.log("login is rendering");
        return (
            <div className="login-wrapper">
                {this.state.error && <div>Wrong credentials!</div>}
                <form className="login-container">
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                    />

                    <button
                        className="login-button"
                        type="button"
                        onClick={() => this.submit()}
                    >
                        login
                    </button>
                </form>
                <div className="reminder-container">
                    not a member yet?
                    <div className="register-button">
                        <Link to="/">Register</Link>
                    </div>
                    <div className="register-button">
                        <Link to="/password/reset">Reset Password</Link>
                    </div>
                </div>
            </div>
        );
    }
}
