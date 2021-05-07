//this file is entry point into React

//ReactDOM appends React with DOM
// lets import component
// import { Component } from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./helloworld";

// references main from index.html, we only call it once in the whole project!
ReactDOM.render(<HelloWorld />, document.querySelector("main"));

//function component
// they are presentational/dumb - function is used to show stuff - you can't have logic in function components!
// function HelloWorld() {
//     // JSX - Javascript that looks like HTML
//     return <div>Hello, World!</div>;
// }

// class components
// class components can have logic!
// if you have a component that the user can interact with, then you'll want a class component.
// if you are not sure, make a class component, because it can do all a function component can do
// class HelloWorld extends Component {
//     constructor() {
//         super();
//     }

//     render() {
//         return <div>Hello, world</div>;
//     }
// }
