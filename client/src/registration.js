import React from "react";
import { Link } from "react-router-dom";
// import { Component } from "react";
import axios from "./axios";

// needs to be a class to conitionally render an error message! -> needs state

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // firstName: "",
            // lastName: "",
            // email: "",
            // password: "",
        };
    }
    submit() {
        axios
            .post("/registration", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    handleChange({ target }) {
        console.log("target: ", target);
        console.log("target.value: ", target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Oops! Something seems to have gone wrong.
                    </div>
                )}
                <div className="welcome-wrapper">
                    <div className="welcome-container">
                        <h3>Welcome to the Social Network.</h3>
                        <div className="motivation-wrapper">
                            <span>
                                To keep connected with us, please login with
                                your credentials.
                            </span>
                            <Link to="/login">
                                <div className="welcome-button">LOGIN</div>
                            </Link>
                            <Link to="/passwordreset">
                                <div className="welcome-button">
                                    Forgot your password?
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="welcome-form">
                        <h3>Create Account</h3>
                        <p className="word-wrapper">
                            Please add your credentials to become a member of
                            this fine establishment.
                        </p>
                        <input
                            name="firstName"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="first name"
                            required
                        />
                        <input
                            name="lastName"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="last name"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            onChange={(e) => this.handleChange(e)}
                            placeholder="email"
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => this.handleChange(e)}
                            required
                        />
                        <button
                            className="register-button"
                            onClick={() => this.submit()}
                        >
                            REGISTER
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

// notes from encounter
// class Registration extends React.Component {
//     //boilerplate stuff
//     constructor(props) {
//         super(props);
//         this.state = {
//             // error: true,
//             // would result in error message
//         };
//     }
//     submit() {
//         console.log("submit button clicked");
//         axios.post('/registration', {})
//     }
//     handleChange({target}) {
//         this.setState({
//             [target.name]: target.value
//         })
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.error && <div className="error">Oops! Sorry</div>}
//                 <input name="first" onChange{(e) => this.handleChange(e)} type="text"></input>
//                 <input name="last" type="text"></input>
//                 <input name="email" type="email"></input>
//                 <input name="pass" type="password"></input>
//                 <button onClick={this.submit}>submit</button>
//             </div>
//         );
//     }
// }
