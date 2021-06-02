import React from "react";
import Profile from "./profile";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./other-profile";
import FindPeople from "./findPeople";
import Friends from "./Friends";
import Chat from "./chat";
import NavBar from "./navbar";
import Tab from "./components/tab";
import IconLink from "./components/iconLink";
import Map from "./Map";
import Button from "./components/Button";
import CheckInModal from "./components/CheckInModal"
// import MapboxGL from "react-map-gl";
// import mapboxgl from "!mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken =
//     "pk.eyJ1IjoiaW50ZXJuZXRsYXJzIiwiYSI6ImNrcGR1bHdvNjFyZmQybnA3a2wyeHRpMzkifQ.B6TyPSQDOf0wX_VKW39bpg";

import {
    faBell,
    faComments,
    faHome,
    faUserFriends,
    faSearch,
    faUser,
    faCogs,
    faSignOutAlt,
    faEnvelope,
    faVideo,
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

// import FriendshipButton from "./FriendshipButton";

//must be a class component (needs both state and lifecycle components)
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            openModal: false,
            // lng: 13.4,
            // lat: 52.52,
            // zoom: 10,
        };
        // this.mapContainer = React.createRef();

        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");
        // const { lng, lat, zoom } = this.state;
        // const map = new mapboxgl.Map({
        //     container: this.mapContainer.current,
        //     style: "mapbox://styles/mapbox/streets-v11",
        //     center: [lng, lat],
        //     zoom: zoom,
        // });

        // map.on("move", () => {
        //     this.setState({
        //         lng: map.getCenter().lng.toFixed(4),
        //         lat: map.getCenter().lat.toFixed(4),
        //         zoom: map.getZoom().toFixed(2),
        //     });
        // });

        axios.get("/user").then((response) => {
            // console.log("response.data in axios: ", response.data);
            this.setState({
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                imgUrl: response.data.img_url,
                bio: response.data.bio,
            });
        });
    }
    toggleUploader() {
        // console.log("toggleUploader triggered.");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    updateProfilePic(imgUrl) {
        this.setState({
            imgUrl,
        });
        this.toggleUploader();
    }
    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        // const { lng, lat, zoom } = this.state;

        return (
            <>
                <BrowserRouter>
                    <div className="outer-wrapper">
                        <div className="bar-wrapper">
                            <div className="sideBar">
                                <div>
                                    <ProfilePic
                                        firstName={this.state.firstName}
                                        lastName={this.state.lastName}
                                        imgUrl={
                                            this.state.imgUrl ||
                                            "/images/defaultprofilepic.jpeg"
                                        }
                                        toggleUploader={this.toggleUploader}
                                    />
                                </div>
                                <div className="tab-wrapper">
                                    <div>
                                        <Tab
                                            link="/"
                                            icon={faHome}
                                            text="Home"
                                        />
                                        {/* <Tab
                                            link="/friendrequests"
                                            icon={faUserFriends}
                                            text="Friends"
                                        /> */}
                                        <Tab
                                            link="/friendrequests"
                                            icon={faUserFriends}
                                            text="Courts"
                                        />

                                        <Tab
                                            link="/chat"
                                            icon={faComments}
                                            text="Chat"
                                        />
                                        {/* <Tab
                                            link="/chat"
                                            icon={faVideo}
                                            text="Live"
                                        /> */}
                                        {/* <Tab
                                            link="/find/users"
                                            icon={faSearch}
                                            text="Search"
                                        /> */}
                                        <Tab
                                            link="/"
                                            icon={faMapMarkerAlt}
                                            text="Map"
                                        />
                                    </div>

                                    <div>
                                        <Tab
                                            link="/"
                                            icon={faUser}
                                            text="Profile"
                                        />
                                        <Tab
                                            link="/"
                                            icon={faCogs}
                                            text="Settings"
                                        />
                                    </div>
                                </div>

                                <div></div>
                            </div>
                            <div className="bar-container">
                                <div className="navbar-wrapper">
                                    <Button text="Check-in" onPressButton={()=>} />
                                    <IconLink
                                        link="/logout"
                                        icon={faSignOutAlt}
                                    />
                                </div>
                                <div className="mainBar">
                                    <div>
                                        <Route
                                            exact
                                            path="/"
                                            render={() => <Map />}
                                        />
                                        <Route
                                            exact
                                            path="/profile"
                                            render={() => (
                                                <Profile
                                                    id={this.state.id}
                                                    firstName={
                                                        this.state.firstName
                                                    }
                                                    lastName={
                                                        this.state.lastName
                                                    }
                                                    imgUrl={
                                                        this.state.imgUrl ||
                                                        "defaultprofilepic.jpeg"
                                                    }
                                                    bio={this.state.bio}
                                                    setBio={(bio) =>
                                                        this.setBio(bio)
                                                    }
                                                    toggleUploader={
                                                        this.toggleUploader
                                                    }
                                                />
                                            )}
                                        />
                                        {/* <NavBar></NavBar> */}

                                        {/* <Route path="/user/:id" component={OtherProfile} /> */}
                                        <Route
                                            exact
                                            path="/user/:id"
                                            render={(props) => (
                                                <OtherProfile
                                                    key={props.match.url}
                                                    match={props.match}
                                                    history={props.history}
                                                />
                                            )}
                                        />
                                        {/* route to search  */}
                                        <Route
                                            path="/find/users"
                                            component={FindPeople}
                                        />
                                        <Route
                                            path="/find/users:id"
                                            component={OtherProfile}
                                        />
                                        <Route
                                            path="/friendrequests"
                                            component={Friends}
                                        ></Route>
                                        <Route
                                            path="/chat"
                                            component={Chat}
                                        ></Route>
                                        {/* <Route path="/navbar" component={NavBar}></Route> */}
                                    </div>
                                </div>
                            </div>

                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    updateProfilePic={this.updateProfilePic}
                                    toggleUploader={this.toggleUploader}
                                />
                            )}
                        </div>
                        {/* <div>
                            <div
                                ref={this.mapContainer}
                                className="map-container"
                            />
                        </div>

                        <div ref={this.mapContainer} className="map-container">
                            <div className="mapbar">
                                Longitude: {lng} | Latitude: {lat} | Zoom:{" "}
                                {zoom}
                            </div>
                        </div> */}
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
