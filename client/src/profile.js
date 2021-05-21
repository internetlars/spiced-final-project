//we don't need to use state or lifecycle method for Profile.js
// App -> Profile -> ProfilePic
import BioEditor from "./bio";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <div className="profile-container">
                <h1>Profile Component</h1>
                <div className="profilepic-container">
                    <ProfilePic
                        firstName={props.firstName}
                        lastName={props.lastName}
                        imgUrl={props.imgUrl || "defaultprofilepic.jpeg"}
                        toggleUploader={props.toggleUploader}
                    />
                </div>
                <p>welcome to your profile, {props.firstName}</p>

                <img
                    src={props.imgUrl}
                    alt={`${props.firstName} ${props.lastName}`}
                />
                <BioEditor bio={props.bio} />
            </div>
        </div>
    );
}
