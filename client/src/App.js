import React from "react";
//Part 5
import Profile from "./profile";
import Logo from "./logo";
import Uploader from "./uploader";

//must be a class component (needs both state and lifecycle components)
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("App just mounted");
    }
    toggleUploader() {
        this.setState({
            uploaderisVisible: !this.state.uploaderisVisible,
        });
    }
    methodInApp(arg) {
        console.log("arguemnt methodInApp go passed: ", arg);
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
