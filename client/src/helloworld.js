// importing without {} because exported Counter with export default!
import Counter from "./counter";

//function component
// they are presentational/dumb - function is used to show stuff - you can't have logic in function components!
// export default
export default function HelloWorld() {
    const last = "braun";
    // JSX - Javascript that looks like HTML
    return (
        <div>
            Hello, World!
            {/* the left-hand side is the name of the prop, You can call the prop what ever you like. */}
            {/* the right-hand side is the value you're passing to the child component. You must pass somehwere there this is defined, ie it must be something you could pass to console.log and it would be defined. */}
            <Counter last={last} />
        </div>
    );
}

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
