import React, {Component} from "react";
import {createPortal} from "react-dom";
import {Link} from "react-router-dom";
import {asset} from "../app/utils";
import Button from "./Button";

export default class CookieNotice extends Component {
    mountNode = document.querySelector('#root-notice');

    state = {
        show: localStorage.getItem('cookieNoticeAccepted') === null,
    };

    handleClick = () => {
        localStorage.setItem('cookieNoticeAccepted', '');
        this.setState({show: false});
    };

    render() {
        if (!this.state.show) {
            return null;
        }

        return createPortal((
            <div className="CookieNotice">
                <div className="CookieNotice__inner">
                    <div className="CookieNotice__content">
                        <img src={asset('img/cookie_icon.svg')} alt="Icon" className="icon"/>

                        <div>
                            <h3>We love cookies...</h3>
                            <p>
                                This site uses cookies. To see how cookies are used, please review our <Link
                                to="/cookies">cookie notice</Link>. If you agree to our use of cookies, please continue
                                to use our site.
                            </p>
                        </div>
                    </div>

                    <Button small onClick={this.handleClick}>continue</Button>
                </div>
            </div>
        ), this.mountNode);
    }
}
