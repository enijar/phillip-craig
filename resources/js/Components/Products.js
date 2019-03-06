import React, {Component} from "react";
import PropTypes from "prop-types";
import {CURRENCIES} from "../app/consts";
import ProductFactory from "../app/Factories/ProductFactory";

export default class Products extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        currency: PropTypes.string,
        decimalPlaces: PropTypes.number,
    };

    static defaultProps = {
        currency: 'gbp',
        decimalPlaces: 2,
    };

    state = {
        products: ProductFactory(6),
    };

    formatPrice(price) {
        const {symbol, rate} = CURRENCIES[this.props.currency];
        return `${symbol}${Number(price / 100 * rate).toFixed(this.props.decimalPlaces)}`;
    }

    render() {
        return (
            <div className="Products">
                {this.state.products.map(item => (
                    <div key={item.id} className="Products__item">
                        <img src={item.img} alt={item.name} className="Products__item__img"/>
                        <h3 className="Products__item__name">
                            {item.name}
                        </h3>
                        <p className="Products__item__price">
                            {this.formatPrice(item.price)}
                        </p>
                    </div>
                ))}
            </div>
        );
    }
}
