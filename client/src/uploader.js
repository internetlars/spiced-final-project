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
    methodInUploader() {
        this.props.methodInApp("Whoaaaaaa");
    }
    handleChange({ target }) {
        console.log("handleChange triggered: ", target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    submitFile(e) {
        console.log("Submit pressed in uploader component");
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.file);
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
                {/* <h2>Hi I am the uploader ⏫ </h2>
                <h2 onClick={() => this.methodInUploader()}>
                    {" "}
                    🔘 Click here to run the method in Uploader that triggers
                    the one in app to run 🏃‍♀️
                </h2> */}

                <div className="uploader-container">
                    <span
                        onClick={this.props.toggleUploader}
                        className="close-button"
                    >
                        X
                    </span>
                    <div>
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
                    </div>
                </div>
            </>
        );
    }
}
