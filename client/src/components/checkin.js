import * as React from "react";
import { style } from "typestyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const boxStyle = style({
  background: "white",
  width: "400px",
  height: "500px",
  display: "block",
  minWidth: "auto",
  minHeight: "auto",
  backgroundColor: "black",
});

const background = style({
  background: "black",
  padding: "1em 0 1em 2em",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderBottom: "1px solid white",
});
const textCheckinTitle = style({
  color: "#fff",
  fontSize: "1.5em",
});

const newCourtButton = style({
  background: "transparent",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const textCheckin = style({
  color: "#fff",
  fontSize: "1em",
});

const textCheckinBold = style({
  color: "#fff",
  fontSize: "1em",
  fontWeight: 700,
});

const containerCorrect = style({
  margin: "0.5em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const buttonStyle = style({
  color: "black",
  backgroundColor: "white",
  fontSize: "1em",
  height: "100",
  minWidth: "80%",
  borderRadius: "50px",
  border: "none",
  padding: "0.5em",
});

const bodyContainerNewCourt = style({
  color: "#fff",
  padding: "3em 2em",
  backgroundColor: "black",
  textAlign: "center",
});

const yesButton = style({
  background: "#24FAD8",
  color: "black",
  fontSize: "1em",
  height: "100",
  width: "90%",
  borderRadius: "40px",
  border: "none",
  padding: "0.5em",
  marginLeft: "10px",
});

const noButton = style({
  background: "#FB021A",
  color: "white",
  fontSize: "1em",
  height: "100",
  width: "90%",
  borderRadius: "40px",
  border: "none",
  padding: "0.5em",
  marginRight: "10px",
});

const buttonGray = style({
  color: "black",
  backgroundColor: "#9F9798",
  fontSize: "1em",
  height: "100",
  minWidth: "80%",
  borderRadius: "50px",
  border: "none",
  padding: "0.5em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const bodyContainer = style({
  color: "#fff",
  padding: "1em 2em",
  backgroundColor: "black",
});

const buttonsContainer = style({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  borderBottom: "1px solid white",
  padding: "10px",
});
const flexContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "spaceBetween",
  padding: "10px",
});

const inputCourt = style({
  display: "flex",
  background: "#fefefe",
  alignItems: "center",
  justifyContent: "spaceBetween",
  padding: "10px",
  color: "black",
  border: "none",
  borderRadius: "25px",
  fontSize: "1em",
});

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
    <div className={boxStyle}>
      <div className={background}>
        <p className={textCheckinTitle}>Check-in</p>
      </div>
      <div className={bodyContainer}>
        <p className={textCheckin}>
          You can check in to the court. This allows other users to see how many
          people are playing.
        </p>
      </div>
      <div className={buttonsContainer}>
        <button
          onClick={() => getCoordinatesPermisions()}
          className={buttonGray}
        >
          ENABLE LOCATION TRACKING
          {geoSucces ? (
            <div className={containerCorrect}>
              <FontAwesomeIcon color="white" size="2x" icon={faCheckCircle} />
            </div>
          ) : null}
        </button>
      </div>
      <div className={buttonsContainer}>
        <button className={buttonStyle} onClick={() => setMatch(true)}>
          COURT CHECK-IN
        </button>
        {match && !addCourt ? (
          <div className={bodyContainer}>
            {/*props.match for the name of the court instead of MausBox */}
            <p className={textCheckin}>Are you in MausBox ?</p>
            <div className={flexContainer}>
              <button className={noButton} onClick={() => setNewCourt(true)}>
                NO
              </button>
              <button className={yesButton} onClick={() => setMatch(true)}>
                YES
              </button>
            </div>
          </div>
        ) : null}
        {addCourt ? (
          <div className={bodyContainerNewCourt}>
            <button
              className={newCourtButton}
              onClick={() => setNewCourtSucces(true)}
            >
              <p className={textCheckinBold}>ADD NEW COURT</p>
              {newCourtSuccess ? (
                <div className={containerCorrect}>
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
              className={inputCourt}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
