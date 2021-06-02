import Modal from "./Modal";

export default function CheckInModal(props) {
    if (!props.open) {
        return null;
    }
    return (
        <div>
            <Modal open={props.open}>
                <div>
                    <h3>Check-In</h3>
                </div>
            </Modal>
        </div>
    );
}
