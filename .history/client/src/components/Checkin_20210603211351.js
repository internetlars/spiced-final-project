import * as React from "react";
import { style } from "typestyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Checkin() {
    const [match, setMatch] = React.useState(false);
    const [geoSucces, setGeoSuccess] = React.useState(false);
    const [newCourtSuccess, setNewCourtSucces] = React.useState(false);
    const [name, setName] = React.useState("");

    const [addCourt, setNewCourt] = React.useState(false);

    const getCoordinatesPermisions = () => {
        setGeoSuccess(true);
    };
    return (
        <div className="boxStyle">
            <div className="background">
                <p className="textCheckinTitle">Check-in</p>
            </div>
            <div className="bodyContainer">
                <p className="textCheckin">
                    You can check in to the court. This allows other users to
                    see how many people are playing.
                </p>
            </div>
            <div className="buttonsContainer">
                <button
                    onClick={() => getCoordinatesPermisions()}
                    className="buttonGray"
                >
                    ENABLE LOCATION TRACKING
                    {geoSucces ? (
                        <div className="containerCorrect">
                            <FontAwesomeIcon
                                color="white"
                                size="2x"
                                icon={faCheckCircle}
                            />
                        </div>
                    ) : null}
                </button>
            </div>
            <div className="buttonsContainer">
                <button className="buttonStyle" onClick={() => setMatch(true)}>
                    COURT CHECK-IN
                </button>
                {match && !addCourt ? (
                    <div className="bodyContainer">
                        {/*props.match for the name of the court instead of MausBox */}
                        <p className="textCheckin">Are you in MausBox ?</p>
                        <div className="flexContainer">
                            <button
                                className="noButton"
                                onClick={() => setNewCourt(true)}
                            >
                                NO
                            </button>
                            <button
                                className="yesButton"
                                onClick={() => setMatch(true)}
                            >
                                YES
                            </button>
                        </div>
                    </div>
                ) : null}
                {addCourt ? (
                    <div className="bodyContainerNewCourt">
                        <button
                            className="newCourtButton"
                            onClick={() => setNewCourtSucces(true)}
                        >
                            <p className="textCheckinBold">ADD NEW COURT</p>
                            {newCourtSuccess ? (
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
                            value={name}
                            className="inputCourt"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
