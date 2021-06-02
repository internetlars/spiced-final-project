import React from "react";
import Modal from "./Modal";

export default class CheckInModal extends React.Component {
    constructor() {
        super();
        this.state = {
            latitude: "",
            longitude: "",
        };

        this.getLocation = this.getLocation.bind(this);
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

    getLocation() {
        console.log("Location Get Location");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        }
    }

    getCoordinates(position) {
        console.log(position.coords);
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
                        <button onClick={this.getLocation}>get Location</button>
                        <div>latitude: {this.state.latitude}</div>
                        <div>latitude: {this.state.longitude}</div>
                    </div>
                </Modal>
            </div>
        );
    }
}
