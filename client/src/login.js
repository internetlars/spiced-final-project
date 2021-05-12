import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                console.log("data: ", data);
                if (data.success) {
                    location.replace("/");
                } else {
                    console.log("error");
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <div>Wrong credentials!</div>}
                <form>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form__input"
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <button type="button" onClick={() => this.submit()}>
                        Login
                    </button>
                </form>
                <Link to="/">click here to Register!</Link>
            </div>
        );
    }
}
