//we need state, so bio.js needs to be a class
import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: true,
        };
    }

    handleBioChange(e) {
        //keep track of bio that user is typing in here
        //and store that value in bioeditor's state as the 'draft bio'
    }

    submitBio() {
        //1. make an axios POST request with the new bio (draft) that the user typed!
        // grab draft bio from bioeditor's state
    }

    render() {
        return (
            <div>
                {/* //if showTextArea is truthy, show textArea */}
                <h1>this is the bio editor</h1>
                {this.state.showTextArea && (
                    <div>
                        <textarea></textarea>
                    </div>
                )}
                {/* else if showTextArea is false, then check to see if there is a bio. */}
            </div>
        );
    }
}
