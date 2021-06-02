//we don't need to use state or lifecycle method for Profile.js
// App -> Profile -> ProfilePic
import BioEditor from "./bio";
import ProfilePic from "./profilepic";
import Map from "./Map";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <div className="profile-container">
                <div className="profilepic-container">
                    {/* <ProfilePic
                        firstName={props.firstName}
                        lastName={props.lastName}
                        imgUrl={props.imgUrl || "defaultprofilepic.jpeg"}
                        toggleUploader={props.toggleUploader}
                    /> */}
                </div>

                <p>
                    Welcome to your profile,{" "}
                    <span className="profile-name">{props.firstName}</span>!
                </p>
                <div className="profileinfo-container">
                    {" "}
                    <img
                        className="profileinfo-img"
                        src={props.imgUrl || "/images/defaultprofilepic.jpeg"}
                        alt={`${props.firstName} ${props.lastName}`}
                    />
                    <h4>
                        {props.firstName} {props.lastName}
                    </h4>
                    <BioEditor setBio={props.setBio} bio={props.bio} />
                </div>
                <div>{/* <Map></Map> */}</div>
            </div>
        </div>
    );
}
