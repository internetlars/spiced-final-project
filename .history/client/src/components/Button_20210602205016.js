// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Button(props) {
    return (
        <div>
            <div className="button-component">{props.text}</div>
        </div>
    );
}
