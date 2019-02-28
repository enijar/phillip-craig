import React, {Component} from "react";
import PropTypes from "prop-types";

const CURRENCIES = {
    gbp: {
        symbol: '£',
        rate: 1,
    },
};

export default class Items extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })),
        currency: PropTypes.string,
        decimalPlaces: PropTypes.number,
    };

    static defaultProps = {
        currency: 'gbp',
        decimalPlaces: 2,
    };

    formatPrice(price) {
        const {symbol, rate} = CURRENCIES[this.props.currency];
        return `${symbol}${Number(price / 100 * rate).toFixed(this.props.decimalPlaces)}`;
    }

    render() {
        return (
            <div className="Items">
                {this.props.items.map(item => (
                    <div key={`item-${item.id}`} className="Items__item">
                        <img src={item.img} alt={item.name} className="Items__item__img"/>
                        <h3 className="Items__item__name">
                            {item.name}
                        </h3>
                        <p className="Items__item__price">
                            {this.formatPrice(item.price)}
                        </p>
                    </div>
                ))}
            </div>
        );
    }
}
