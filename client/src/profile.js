//we don't need to use state or lifecycle method for Profile.js
// App -> Profile -> ProfilePic
// import ProfilePic from ""

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <h1>Profile Component</h1>
            <p>welcome to your profile, {props.first}</p>
        </div>
    );
}
