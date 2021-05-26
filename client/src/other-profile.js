// import { response } from "express";
import { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./FriendshipButton";
// import { Link } from "react-router-dom";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("OtherProfile mounted.");
        const { id } = this.props.match.params;
        console.log("id in otherProfile: ", id);
        axios
            .get(`/other-user/${id}`)
            .then((response) => {
                const { data } = response;
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
                    bio: data.bio,
                });
            })
            .catch((error) => {
                console.log(
                    "Error caught in mounting of OtherProfile: ",
                    error
                );
                this.props.history.push("/");
            });
    }
    render() {
        return (
            <div className="profile-container">
                {this.state && <p>User: {this.props.match.params.id}</p>}
                {/* <h2>Other Profile</h2> */}

                <img
                    className="profile-pic"
                    src={this.state.imgUrl}
                    alt={`${this.state.firstName} ${this.state.lastName}`}
                />
                <h3>
                    {this.state.firstName} {this.state.lastName}
                </h3>
                <p>{this.state.bio}</p>
                {/* render friendshipbutton here */}
                {/* <Link to={"/find/users.json/"}>Search for others</Link> */}
                <br></br>
                <FriendshipButton id={this.props.match.params.id} />
            </div>
        );
    }
}
