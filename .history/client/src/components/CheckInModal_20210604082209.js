import React from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import courts from "../mocks/courts.json";

export default class CheckInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
        };

        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        // this.checkCourts = this.checkCourts.bind(this);
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
        } else {
            console.log("Error caught in getLocation.");
        }
    }

    async getCoordinates(position) {
        console.log("position in getCoordinates: ", position);
        console.log(position.coords);
        const lat = await position.coords.latitude;
        const long = await position.coords.longitude;

        this.setState({
            latitude: lat,
            longitude: long,
        });
    }

    initCoords() {
        console.log("initCoords triggered");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
            console.log("Error in geolocation.");
        }
    }

    //not done yet! should check which courts are within range
    checkCourts() {
        console.log(courts.courts);
        const match = courts.courts.find((item) => {
            const diffLat = Math.abs(item.latitude - this.state.latitude);
            const diffLng = Math.abs(item.longitude - this.state.longitude);
            console.log("item.latitude: ", item.latitude);
            console.log("item.longitude: ", item.longitude);
            console.log("this.state.latitude: ", this.state.latitude);
            console.log("this.state.longitude: ", this.state.longitude);
            console.log("difference between Latitudes: ", diffLat);
            console.log("difference between Longitudes: ", diffLng);

            if (diffLat < 0.01 && diffLng < 0.01) {
                console.log("In the vicinity!");
                return item;
            }
            // item.latitude === this.state.latitude &&
            //     item.longitude === this.state.longitude;
        });
        // if difference between own coordinates and coordinates of defined court coordinates are +- 0.00002, allow match! (math.abs)
        console.log("match: ", match);
    }

    //add Court function

    render() {
        return (
            <div>
                <div>
                    <div onClick={this.props.openModal}>X</div>
                    <h3>Check-In</h3>
                    <div>Yes</div>
                    <div>No</div>
                    <button onClick={() => this.checkCourts()}>
                        get Location
                    </button>
                    <button onClick={() => this.initCoords()}>
                        get coordinates
                    </button>
                    <button>Add Court</button>
                    <div>latitude: {this.state.latitude}</div>
                    <div>latitude: {this.state.longitude}</div>
                </div>
            </div>
        );
    }
}
