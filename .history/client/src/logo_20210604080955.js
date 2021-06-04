import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
    return (
        <FontAwesomeIcon
            className="fontawesome-iconLink"
            style={{
                marginTop: "10px",
                marginLeft: "10px",
                width: "150px",
                height: "150px",
            }}
            color="#24fad8"
            icon={faBaseballBall}
        />
    );
}
