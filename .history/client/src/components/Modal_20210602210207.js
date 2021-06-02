export default function Modal(props) {
    if (!props.open) {
        return null;
    }
    return <div className="container-modal">{props.children}</div>;
}
