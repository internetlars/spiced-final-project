import React from "react";
// import { Component } from "react";
import axios from "axios";

// needs to be a class to conitionally render an error message! -> needs state

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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

                <form method="POST" className="registration_form">
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
                        name="pass"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                    <button onClick={() => this.submit()}>register</button>
                    <div>
                        <span>
                            already registered?
                            <a href="#">Login</a>
                        </span>
                    </div>
                </form>
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
