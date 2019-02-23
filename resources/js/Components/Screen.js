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

    state = {
        cookieNoticeShown: true,
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

    handleCookieNoticeShowChange = cookieNoticeShown => {
        this.setState({cookieNoticeShown});
    };

    render() {
        return (
            <div className={`
                Screen
                Screen--${this.props.name}
                ${this.state.cookieNoticeShown ? 'Screen--has-cookies-notice' : ''}
            `}>
                {this.props.children}
                <CookieNotice onShowChange={this.handleCookieNoticeShowChange}/>
            </div>
        );
    }
}
