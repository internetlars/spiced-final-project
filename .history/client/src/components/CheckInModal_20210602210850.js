import Modal from "./Modal";

export default function CheckInModal(props) {
    if (!props.open) {
        return null;
    }
    return (
        <div className="container-modal">
            <div className="modal-inside">{props.children}</div>
        </div>
    );
}
