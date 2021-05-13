import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
            <div>
                {this.state.error && <div>Wrong credentials!</div>}
                <form>
                    <div>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <button type="button" onClick={() => this.submit()}>
                        login
                    </button>
                </form>
                <span>
                    not a member yet?
                    <Link to="/">click here to Register!</Link>
                    <Link to="/passwordreset">Reset Password</Link>
                </span>
            </div>
        );
    }
}
