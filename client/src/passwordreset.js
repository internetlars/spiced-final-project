import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
        };
    }
    submit(e) {
        e.preventDefault();
        this.setState({
            error: null,
        });
        if (this.state.view === 1) {
            axios
                .post("/password/reset/start", {
                    email: this.state.email,
                })
                .then(() => {
                    this.setState({
                        view: 2,
                    });
                })
                .catch((error) => {
                    console.log(
                        "Error caught in if statement ResetPassword component: ",
                        error
                    );
                    this.setState = {
                        error:
                            "There was an error resetting your password. Please try again.",
                    };
                });
        } else if (this.state.view === 2) {
            console.log("else if password reset");
            axios
                .post("/password/reset/verify", {
                    email: this.state.email,
                    password: this.state.password,
                    code: this.state.code,
                })
                .then(() => {
                    this.setState({ view: 3 });
                })
                .catch((err) => {
                    console.log("Error caught in this.state.view === 2", err);
                    this.setState = {
                        err:
                            "There was an error resetting your password. Please try again.",
                    };
                });
        }
    }
    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    determineViewToRender() {
        if (this.state.view === 1) {
            return (
                <div>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button type="button" onClick={() => this.submit()}>
                        submit
                    </button>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    <input
                        name="code"
                        type="text"
                        placeholder="verification code"
                        required
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="new password"
                        required
                        onChange={(e) => this.handleChange(e)}
                        // "{(e) => this.handleChange(e)}"
                    />
                    <button type="submit" onClick={(e) => this.submit(e)}>
                        submit
                    </button>
                </div>
            );
        } else if (this.state.view === 3) {
            return (
                <div>
                    <h1> you successfully reset your password</h1>
                    <Link to="/login">login</Link>
                </div>
            );
        }
    }
    render() {
        return (
            <>
                {/* calling our method to figure out which view we should render */}
                {this.determineViewToRender()}
            </>
        );
    }
}
