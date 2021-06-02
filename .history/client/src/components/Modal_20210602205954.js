export default function Modal(props) {
    return (
        <button className="button-component" onClick={props.onPressButton}>
            {props.text}
        </button>
    );
}
