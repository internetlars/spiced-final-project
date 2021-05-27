//display a profile pic

export default function ProfilePic(props) {
    return (
        <>
            <div className="profilepic-wrapper">
                <img
                    className="tab-avatar"
                    src={props.imgUrl}
                    alt={`${props.firstName} + ${props.lastName}`}
                    onClick={props.toggleUploader}
                />
                <h3>
                    {props.firstName} {props.lastName}
                </h3>
            </div>
        </>
    );
}
