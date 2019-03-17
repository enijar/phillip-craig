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
            addToBasket: this.addToBasket,
            removeFromBasket: this.removeFromBasket,
        };
    }

    addToBasket = product => {
        const {basket} = this.state;
        const matchingProductIndex = this.findProductBasketIndex(product);
        if (matchingProductIndex >= 0) {
            basket[matchingProductIndex].quantity += product.quantity;
        } else {
            basket.push(product);
        }
        return this.setState({basket});
    };

    removeFromBasket = (product, amount = -1) => {
        const {basket} = this.state;
        const matchingProductIndex = this.findProductBasketIndex(product);
        if (matchingProductIndex < 0) {
            return;
        }
        if (amount > -1) {
            basket[matchingProductIndex].quantity -= amount;
        }
        if (amount === -1 || basket[matchingProductIndex].quantity <= 0) {
            basket.splice(matchingProductIndex, 1);
        }
        return this.setState({basket});
    };

    findProductBasketIndex(product) {
        const {basket} = this.state;
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].id === product.id && basket[i].size === product.size) {
                return i;
            }
        }
        return -1;
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
