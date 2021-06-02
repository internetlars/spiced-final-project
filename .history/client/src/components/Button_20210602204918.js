// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Button(props) {
    return (
        <div>
            <Link to={props.link}>
                <div className="check-in-button">{props.text}</div>
            </Link>
        </div>
    );
}
