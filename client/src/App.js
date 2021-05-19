import React from "react";
import Profile from "./profile";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { BrowserRouter, Route } from "react-router-dom";
// import { response } from "express";

//must be a class component (needs both state and lifecycle components)
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: true,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");
        axios.get("/user").then((response) => {
            // console.log("response.data in axios: ", response.data);
            this.setState({
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                imgUrl: response.data.img_url,
                bio: response.data.bio,
            });
        });
    }
    toggleUploader() {
        // console.log("toggleUploader triggered.");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    updateProfilePic(imgUrl) {
        this.setState({
            imgUrl,
        });
        this.toggleUploader();
    }
    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }
    render() {
        return (
            <>
                <div>
                    <header>
                        <h1>hello i am App</h1>
                        <ProfilePic
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            imgUrl={
                                this.state.imgUrl ||
                                "/images/defaultprofilepic.jpeg"
                            }
                            toggleUploader={this.toggleUploader}
                        />
                    </header>
                    <BrowserRouter>
                        <main>
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Profile
                                            id={this.state.id}
                                            firstName={this.state.firstName}
                                            lastName={this.state.lastName}
                                            imgUrl={
                                                this.state.imgUrl ||
                                                "defaultprofilepic.jpeg"
                                            }
                                            toggleUploader={this.toggleUploader}
                                            bio={this.state.bio}
                                            setBio={this.setBio}
                                        />
                                    )}
                                />
                            </div>
                        </main>
                    </BrowserRouter>
                    {/* <Profile
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={
                            this.state.imageUrl ||
                            "/images/defaultprofilepic.jpeg"
                        }
                        toggleUploader={this.toggleUploader}
                    /> */}

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updateProfilePic={this.updateProfilePic}
                            toggleUploader={this.toggleUploader}
                        />
                    )}
                </div>
            </>
        );
    }
}
