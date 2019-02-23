import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

@withRouter
export default class PreviousScreenLink extends Component {
    state = {
        screens: JSON.parse(localStorage.getItem('app.screens') || '[]'),
    };

    render() {
        const lastScreen = this.state.screens[0] || this.props.location.pathname;

        if (lastScreen === this.props.location.pathname) {
            return null;
        }

        return (
            <Link to={lastScreen}>
                {this.props.children}
            </Link>
        );
    }
}
