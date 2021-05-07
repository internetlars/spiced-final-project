import { Component } from "react";
// let's import axios
// import axios from "axios";

// class components allow us to use something called "state".
// "state" is the React equivalent to Vue's "data".
// class can have state, function components cannot have state!
export default class Counter extends Component {
    constructor() {
        super();
        //let's create state (state is always an object, like data)
        this.state = {
            first: "lars",
            //set a new attribute, starting point to increment from!
            currentCount: 0,
        };
    }

    // class components can also have lifecycle methods!(like mounted in Vue)
    // in React this is called componentDidMount
    // axios request is done same way as in vue, except we need to import axios!
    componentDidMount() {
        console.log("component mounted, baby!");
        // axios
        //     .get("/some-path")
        //     .then(() => {})
        //     .catch((err) => {
        //         console.log("err in GET /some-path: ", err);
        //     });

        // you must use this.setState to update state in React
        // setState always takes an object as it's argument
        this.setState({
            first: "marjoram",
        });
    }

    // define handleClick function
    handleClick() {
        // console.log("handleClick is running!");
        //we want to update state, so we need to use setState
        this.setState({
            currentCount: this.state.currentCount + 1,
        });
    }
    //render is JS function, so we can do JS things here like console.log
    render() {
        console.log("this.state in Counter: ", this.state);
        return (
            // after return only JSX possible
            <div>
                <h1>
                    Hello, {this.state.first} {this.props.last}
                </h1>
                <h3> {this.state.currentCount}</h3>
                <button onClick={() => this.handleClick()}>
                    click to count
                </button>
            </div>
        );
    }
}
