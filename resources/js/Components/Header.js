import React, {Component} from "react";
import {Link} from "react-router-dom";
import {asset} from "../app/utils";

export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <img src={asset('img/logo-white.svg')} alt="Phillip Craig Logo" className="Header__logo"/>

                <div className="Header__actions">
                    <button className="Header__search">
                        <img src={asset('img/icons/search.svg')} alt="Search"/> <span>Search</span>
                    </button>
                    <Link className="Header__login" to="/login">
                        <img src={asset('img/icons/login.svg')} alt="Login"/> <span>Login</span>
                    </Link>
                    <button className="Header__basket">
                        <img src={asset('img/icons/basket.svg')} alt="Basket"/>
                    </button>
                </div>
            </div>
        );
    }
}
