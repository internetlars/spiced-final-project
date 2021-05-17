import React from "react";
//Part 5
import Profile from "./profile";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { response } from "express";

//must be a class component (needs both state and lifecycle components)
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");

        axios.get("/user").then((response) => {
            console.log("response.data in axios: ", response.data);
            this.setState({
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                imgUrl: response.data.img_url,
            });
        });
    }
    toggleUploader() {
        this.setState({
            uploaderisVisible: !this.state.uploaderisVisible,
        });
    }
    updateProfilePic(imgUrl) {
        this.setState({
            imgUrl,
        });
        this.toggleUploader();
    }
    methodInApp(arg) {
        console.log("arguemnt methodInApp go passed: ", arg);
    }
    render() {
        return (
            <>
                <div>
                    <header>
                        <h1>hello i am App</h1>
                    </header>
                    <ProfilePic
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imgUrl={
                            this.state.img || "/images/defaultprofilepic.jpeg"
                        }
                        toggleUploader={this.toggleUploader}
                    />

                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={
                            this.state.imageUrl ||
                            "/images/defaultprofilepic.jpeg"
                        }
                    />
                    {/* <h2 onClick={this.toggleUploader}>
                        Change state with a method: toggleUploader
                        {this.state.uploaderIsVisible && "🐵"}
                        {!this.state.uploaderIsVisible && "🙈"}
                    </h2> */}
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            // methodInApp={this.methodInApp}
                            updateProfilePic={this.updateProfilePic}
                            toggleUploader={this.toggleUploader}
                        />
                    )}
                </div>
            </>
        );
    }
}
