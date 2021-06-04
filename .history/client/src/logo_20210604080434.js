import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
    return (
        <FontAwesomeIcon
            className="fontawesome-iconLink"
            style={{
                marginRight: "30px",
                width: "200px",
                height: "200px",
            }}
            color="#24fad8"
            icon={faBaseballBall}
        />
    );
}
