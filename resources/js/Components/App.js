import React, {Component} from "react";
import Routes from "../routes";
import {Context} from "../app/AppContext";

export default class App extends Component {
    state = {
        basket: [],
        price: {
            currency: 'gbp',
            decimalPlaces: 2,
        },
    };

    getContext() {
        return {
            basket: this.state.basket,
            price: this.state.price,
        };
    }

    render() {
        return (
            <Context.Provider value={this.getContext()}>
                <div className="App">
                    <Routes/>
                </div>
            </Context.Provider>
        );
    }
}
