//display a profile pic

export default function ProfilePic(props) {
    return (
        <>
            <div>
                <img
                    className="profilepic"
                    src={props.imgUrl}
                    alt={`${props.firstName} + ${props.lastName}`}
                    onClick={props.toggleUploader}
                />
            </div>
        </>
    );
}
