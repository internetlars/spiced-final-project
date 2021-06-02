// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button(props) {
    return (
        <button className="button-component" onClick={props.onPressButton}>
            {props.text}
        </button>
    );
}
