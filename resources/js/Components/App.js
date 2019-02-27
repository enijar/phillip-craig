import React, {Component} from "react";
import Routes from "../routes";
import {Context} from "../app/AppContext";

export default class App extends Component {
    state = {
        basket: [],
    };

    getContext() {
        return {
            basket: this.state.basket,
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
