import React from "react";
//Part 5
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("App just mounted");
    }
    render() {
        return (
            <>
                <header>
                    <h1>hello i am App</h1>
                </header>

                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imagest={this.state.imageUrl}
                />
            </>
        );
    }
}
