import Modal from "./Modal";

export default function CheckInModal(props) {
    if (!props.open) {
        return null;
    }
    return (
        <div>
            <Modal open={props.open}>
                <div>
                    <div>Check-In</div>
                </div>
            </Modal>
        </div>
    );
}
