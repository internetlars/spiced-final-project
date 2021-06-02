export default function Modal(props) {
    if (!open) {
        return null;
    }
    return (
        <button className="button-component" onClick={props.onPressButton}>
            {props.text}
        </button>
    );
}
