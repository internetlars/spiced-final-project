import Modal from "./Modal";

export default function CheckInModal(props) {
    if (!props.open) {
        return null;
    }
    return (
        <div>
            <Modal open={props.open}>
                <div>
                    <span>X</span>
                    <h3>Check-In</h3>
                    <div>Yes</div>
                    <div>No</div>
                </div>
            </Modal>
        </div>
    );
}
