import React, { Component } from "react";
import SidebarIcon from "./SidebarIcon";

export default class Sidebar extends Component {
    state  {
        isOpen: true,
    };

    renderSidebar = () => {
        if (!this.state.isOpen) {
            return null;
        }

        return (
            <div className="sidebar">
                <div className="sidebar-link">Home</div>
                <div className="sidebar-link">About</div>
                <div className="sidebar-link">Contact</div>
            </div>
        );
    };
    toggleSidebar = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };
    render() {
        return (
            <div className="sidebar-container">
                {this.renderSidebar()}
                <div className="sidebar-icon">
                    <SidebarIcon
                        isOpen={this.state.isOpen}
                        handleClick={this.toggleSidebar}
                    />
                </div>
            </div>
        );
    }
}
