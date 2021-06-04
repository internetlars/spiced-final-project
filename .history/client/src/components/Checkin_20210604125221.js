import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import courts from "../mocks/courts.json";

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
            newCourt: "",
            courtData: JSON.parse(localStorage.getItem("courts")),
        };

        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        // this.checkCourts = this.checkCourts.bind(this);
    }

    componentDidMount() {
        this.setState({
            courtData: JSON.parse(localStorage.getItem("courts")),
        });
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
            alert("Geolocation not available!");
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

    pushNewCourt() {
        try {
            const newCourtArray = this.state.courtData.push({
                name: this.state.newCourt,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                coordinates: [this.state.longitude, this.state.latitude],
                description: "New court!",
                checkins: 1,
            });

            this.setState({ newCourtSuccess: true });
            console.log("New court: ", this.state.courtData);
            localStorage.setItem("courts", JSON.stringify(newCourtArray));
            this.props.call();

            setTimeout(() => {
                this.setState({
                    geoSucces: false,
                    addCourt: false,
                });
            }, 1000);
        } catch (error) {
            console.log(error);
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
        // console.log(courts.courts);

        this.state.courtData.find((item) => {
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

    checkInToCourt() {
        try {
            const elementIndex = this.state.courtData.findIndex(
                (element) => element.name === this.state.name
            );
            console.log("element", elementIndex);
            const newArray = [...this.state.courtData];
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                checkins: newArray[newArray.checkins] ?? 0 + 1,
            };
            this.setState({ courtData: newArray, checkinSuccess: true });
            localStorage.setItem("courts", JSON.stringify(newArray));
            this.props.call;
            setTimeout(() => {
                this.setState({
                    geoSucces: false,
                    checkinSuccess: false,
                    match: false,
                });
            }, 4000);
            console.log("New Array", newArray);
        } catch (error) {
            console.log(error);
        }
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
                        You can check in to the court. This allows others to see
                        how many people are playing.
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
                    {!this.state.addCourt ? (
                        <button
                            className="buttonGray"
                            onClick={() => this.checkCourts()}
                        >
                            COURT CHECK-IN
                            {this.state.checkinSuccess ? (
                                <div className="containerCorrect">
                                    <FontAwesomeIcon
                                        color="black"
                                        size="2x"
                                        icon={faCheckCircle}
                                    />
                                </div>
                            ) : null}
                        </button>
                    ) : null}
                    {this.state.addCourt ? (
                        <div className="buttonsContainerNotBorder">
                            <button
                                className="buttonGray"
                                onClick={() => this.pushNewCourt()}
                            >
                                ADD NEW COURT
                                {this.state.newCourtSuccess ? (
                                    <div className="containerCorrect">
                                        <FontAwesomeIcon
                                            color="black"
                                            size="2x"
                                            icon={faCheckCircle}
                                        />
                                    </div>
                                ) : null}
                            </button>
                            <input
                                type="text"
                                placeholder="name of the court"
                                value={this.state.newCourt}
                                className="inputCourt"
                                onChange={(e) =>
                                    this.setState({ newCourt: e.target.value })
                                }
                            />
                            <p className="textCheckin">
                                Your coordinates: {this.state.latitude}{" "}
                                {this.state.longitude}
                            </p>
                        </div>
                    ) : null}
                    {this.state.match &&
                    !this.state.addCourt &&
                    !this.state.checkinSuccess ? (
                        <div className="bodyContainer">
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
                                    onClick={() => this.checkInToCourt()}
                                >
                                    YES
                                </button>
                            </div>
                        </div>
                    ) : null}
                    {this.state.checkinSuccess ? (
                        <div className="flexContainer">
                            <p className="textCheckin">
                                You are checked in at{" "}
                                <span className="textCheckinBold">
                                    {this.state.name}
                                </span>
                                .
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
