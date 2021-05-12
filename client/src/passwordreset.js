import { Component } from "react";
import axios from "./axios";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
        };
    }
    submit() {
        this.setState({
            error: null
        }
    }
    
}
