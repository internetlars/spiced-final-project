import React from "react";
import Modal from "./Modal";

export default class CheckInModal extends React.Component {
    render() {
        return (
            <div>
                <Modal open={this.props.open}>
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
}
