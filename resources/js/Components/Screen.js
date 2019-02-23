import React, {Component} from "react";
import PropTypes from "prop-types";
import CookieNotice from "./CookieNotice";

export default class Screen extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: '',
    };

    render() {
        return (
            <div className={`Screen Screen--${this.props.name}`}>
                {this.props.children}
                <CookieNotice/>
            </div>
        );
    }
}
