// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button(props) {
    return (
        <div className="button-component">
            <button onClick={props.onPressButton}>{props.text}</button>
        </div>
    );
}
