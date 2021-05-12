// import ReactDOM from "react-dom";
import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./logo";
import Login from "./login";

// function component
export default function Welcome() {
    return (
        <div>
            {/* renders splash image or logo */}
            {/* <img></img> */}
            <h1>Welcome!</h1>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
            {/* <Registration /> */}
        </div>
    );
}
