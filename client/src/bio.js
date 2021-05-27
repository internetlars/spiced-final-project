//we need state, so bio.js needs to be a class
import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
            draftBio: "",
        };
        // this.showTextArea = this.showTextArea.bind(this);
        // this.handleBioChange = this.handleBioChange.bind(this);
        // this.submitBio = this.submitBio.bind(this);
    }

    handleBioChange({ target }) {
        //keep track of bio that user is typing in here
        //and store that value in bioeditor's state as the 'draft bio'
        this.setState({
            draftBio: target.value,
        });
    }

    submitBio(e) {
        //1. make an axios POST request with the new bio (draft) that the user typed!
        // grab draft bio from bioeditor's state
        e.preventDefault();
        console.log("button works");
        if (!this.state.draftBio) {
            this.toggleBio();
            return;
        }
        axios
            .post("/updatebio", {
                bio: this.state.draftBio,
            })
            .then((response) => {
                this.props.setBio(response.data.bio);
                this.toggleBio();
            })
            .catch((error) => {
                console.log("Error caught in submitBio: ", error);
            });
    }

    toggleBio() {
        this.setState({
            showTextArea: !this.state.showTextArea,
        });
    }

    render() {
        return (
            <div className="bio-container">
                {!this.props.bio && !this.state.showTextArea && (
                    <>
                        <p></p>
                        <a
                            className="addBio-btn"
                            onClick={() => this.toggleBio()}
                        >
                            Add bio
                        </a>
                    </>
                )}
                {this.props.bio && (
                    <>
                        <p>{this.props.bio}</p>
                        <button
                            className="edit-btn"
                            onClick={() => this.toggleBio()}
                        >
                            Edit bio
                        </button>
                    </>
                )}
                {this.state.showTextArea && (
                    <>
                        <textarea
                            className="bio-container-textarea"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleBioChange(e)}
                        ></textarea>
                        <button onClick={(e) => this.submitBio(e)}>
                            Submit
                        </button>
                        <button onClick={(e) => this.toggleBio(e)}>
                            Cancel
                        </button>
                    </>
                )}
            </div>
        );
    }
}
