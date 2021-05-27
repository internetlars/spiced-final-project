import React from "react";
import axios from "./axios";

//needs to be a class component
//conditional rendering

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("Uploader just mounted");
        console.log("props in Uploader", this.props);
    }
    handleChange({ target }) {
        console.log("handleChange triggered: ", target.value);
        this.setState({
            [target.name]: target.files[0],
        });
    }
    submitFile(e) {
        console.log("Submit pressed in uploader component");
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                const { img_url } = data;
                this.props.updateProfilePic(img_url);
            })
            .catch((error) => {
                console.log("Error caught in axios submitFile", error);
            });
    }
    render() {
        return (
            <>
                <div className="uploader-wrapper">
                    <div className="uploader-container">
                        <div
                            onClick={this.props.toggleUploader}
                            className="close-button"
                        >
                            X
                        </div>
                        <h3>upload a profile pic</h3>
                        <div className="uploader-file-form">
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <button
                                onClick={(e) => this.submitFile(e)}
                                className="submit-button"
                            >
                                submit
                            </button>
                            <button
                                className="toggleuploader-button"
                                onClick={this.props.toggleUploader}
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
