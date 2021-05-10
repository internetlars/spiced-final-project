// import ReactDOM from "react-dom";
import Registration from "./registration";

// function component
export default function Welcome() {
    // render a welcome message
    return (
        <div>
            <div>
                {/* renders splash image or logo */}
                <img></img>
                <h1>Welcome!</h1>
            </div>
            {/* registration component */}
            <Registration />
            <div></div>
        </div>
    );
}
