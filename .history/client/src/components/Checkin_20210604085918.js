import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import courts from "../mocks/courts.json";

export default class Checkin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            match: false,
            geoSucces: false,
            newCourtSuccess: false,
            name: "",
            addCourt: false,
            checkinSuccess: false,
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
            geoSucces: true,
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

            if (diffLat < 0.001 && diffLng < 0.001) {
                console.log("In the vicinity!");
                console.log("item found", item);
                this.setState({ name: item.name });
                this.setState({ match: true });
                return item;
            }
        });
    }

    //add Court function

    render() {
        return (
            <div className="boxStyle">
                <div className="background">
                    <p className="textCheckinTitle">Check-in</p>
                </div>
                <div className="bodyContainer">
                    <p className="textCheckin">
                        You can check in to the court. This allows other users
                        to see how many people are playing.
                    </p>
                </div>
                <div className="buttonsContainer">
                    <button
                        onClick={() => this.initCoords()}
                        className="buttonGray"
                    >
                        ENABLE LOCATION TRACKING
                        {this.state.geoSucces ? (
                            <div className="containerCorrect">
                                <FontAwesomeIcon
                                    color="black"
                                    size="2x"
                                    icon={faCheckCircle}
                                />
                            </div>
                        ) : null}
                    </button>
                </div>
                <div className="buttonsContainer">
                    <button
                        className="buttonStyle"
                        onClick={() => this.checkCourts()}
                    >
                        COURT CHECK-IN
                    </button>
                    {this.state.match && !this.state.addCourt ? (
                        <div className="bodyContainer">
                            {/*props.match for the name of the court instead of MausBox */}
                            <p className="textCheckin">
                                Are you at {this.state.name} ?
                            </p>
                            <div className="flexContainer">
                                <button
                                    className="noButton"
                                    onClick={() =>
                                        this.setState({ addCourt: true })
                                    }
                                >
                                    NO
                                </button>
                                <button
                                    className="yesButton"
                                    onClick={() =>
                                        this.setState({ checkinSuccess: true })
                                    }
                                >
                                    YES
                                </button>
                            </div>
                        </div>
                    ) : this.state.checkinSuccess ? (
                        <div className="flexContainer">
                            <p className="textCheckin">
                                You are checked in at {this.state.name}.
                            </p>
                            <FontAwesomeIcon
                                color="white"
                                size="2x"
                                icon={faCheckCircle}
                            />
                        </div>
                    ) : null}
                    {this.state.addCourt ? (
                        <div className="bodyContainerNewCourt">
                            <button
                                className="newCourtButton"
                                onClick={() =>
                                    this.setState({ newCourtSuccess: true })
                                }
                            >
                                <p className="textCheckinBold">ADD NEW COURT</p>
                                {this.state.newCourtSuccess ? (
                                    <div className="containerCorrect">
                                        <FontAwesomeIcon
                                            color="white"
                                            size="2x"
                                            icon={faCheckCircle}
                                        />
                                    </div>
                                ) : null}
                            </button>
                            <input
                                value={this.state.name}
                                className="inputCourt"
                                onChange={(e) =>
                                    this.setState({ name: e.target.value })
                                }
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
