import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo() {
    return (
        <FontAwesomeIcon
            className="fontawesome-iconLink"
            style={{
                marginRight: "30px",
                width: "25px",
                height: "25px",
            }}
            color="#24fad8"
            icon={props.icon}
        />
    );
}
