import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function IconLink(props) {
    return (
        <div>
            <Link to={props.link}>
                <div>
                    <FontAwesomeIcon
                        style={{
                            marginRight: "30px",
                            width: "25px",
                            height: "25px",
                        }}
                        color="#6C4B5E"
                        icon={props.icon}
                    />
                </div>
            </Link>
        </div>
    );
}
