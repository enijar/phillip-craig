import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

const LINKS = [
    {pathname: '/', text: 'Shop'},
    {pathname: '/new', text: 'New'},
    {pathname: '/popular', text: 'Popular'},
    {pathname: '/sale', text: 'Sale'},
];

@withRouter
export default class Nav extends Component {
    render() {
        return (
            <div className="Nav">
                {LINKS.map((link, index) => (
                    <Link
                        key={index}
                        to={link.pathname}
                        className={`${link.pathname === this.props.location.pathname ? 'active' : ''}`}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>
        );
    }
}
