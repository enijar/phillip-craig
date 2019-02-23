import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import CookieNotice from "./CookieNotice";

@withRouter
export default class Screen extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: '',
    };

    componentDidMount() {
        // Add this screen to the beginning of the array and persist to storage
        const screens = JSON.parse(localStorage.getItem('app.screens') || '[]');
        if (screens.length === 2) {
            screens.pop();
        }
        screens.unshift(this.props.location.pathname);
        localStorage.setItem('app.screens', JSON.stringify(screens));
    }

    render() {
        return (
            <div className={`Screen Screen--${this.props.name}`}>
                {this.props.children}
                <CookieNotice/>
            </div>
        );
    }
}
