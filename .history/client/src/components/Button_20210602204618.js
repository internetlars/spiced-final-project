import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function IconLink(props) {
    return (
        <div>
            <Link to={props.link}>
                <div>Check In!</div>
            </Link>
        </div>
    );
}
