export default function Modal(props) {
    if (!props.open) {
        return null;
    }
    return (
        <div className="container-modal">
            <div className="modal">{props.children}</div>
        </div>
    );
}
