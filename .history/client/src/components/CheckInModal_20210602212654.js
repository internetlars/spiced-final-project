import React from "react";
import Modal from "./Modal";

export default class CheckInModal extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
        };
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        console.log(result.state);
                    } else if (result.state === "prompt") {
                        console.log(result.state);
                    } else if (result.state === "denied") {
                        console.log("Denied");
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }

    render() {
        return (
            <div>
                <Modal open={this.props.open}>
                    <div>
                        <span>X</span>
                        <h3>Check-In</h3>
                        <div>Yes</div>
                        <div>No</div>
                    </div>
                </Modal>
            </div>
        );
    }
}
