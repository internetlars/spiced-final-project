import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function IconLink(props) {
    return (
        <div>
            <Link to={props.link}>
                <div>
                    <FontAwesomeIcon
                        className="fontawesome-iconLink"
                        style={{
                            marginRight: "30px",
                            width: "25px",
                            height: "25px",
                        }}
                        color="#25D980"
                        icon={props.icon}
                    />
                </div>
            </Link>
        </div>
    );
}
