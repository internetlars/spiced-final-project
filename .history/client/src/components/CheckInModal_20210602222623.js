import React from "react";
import Modal from "./Modal";
import courts from "../mocks/courts.json";

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

    async getCoordinates(position) {
        console.log(position.coords);
        const lat = await position.coords.latitude;
        const long = await position.coords.longitude;

        this.setState({
            latitude: lat,
            longitude: long,
        });
    }

    checkCourts() {
        console.log(courts.courts);
        const a = courts.courts.find((item) => {
            item.latitude = this.state.latitude && item.longitude = this.state.longitude
        });
        //1. array courts
        //2. map check each object lat and long
        //3. lat and long are in a range
        //4. if it finds a match ask if you are in that court
        //5. if not a match ask you to add a new court
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
                        <button onClick={this.checkCourts}>get Location</button>
                        <div>latitude: {this.state.latitude}</div>
                        <div>latitude: {this.state.longitude}</div>
                    </div>
                </Modal>
            </div>
        );
    }
}
