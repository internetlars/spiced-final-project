import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
    return (
        <FontAwesomeIcon
            className="fontawesome-iconLink"
            style={{
                marginRight: "30px",
                width: "240px",
                height: "240px",
            }}
            color="#24fad8"
            icon={faBaseballBall}
        />
    );
}
