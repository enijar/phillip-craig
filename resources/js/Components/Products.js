import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {formatPrice} from "../app/utils";
import ProductFactory from "../app/Factories/ProductFactory";
import AppContext from "../app/AppContext";

@AppContext
export default class Products extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
    };

    state = {
        products: ProductFactory(6),
    };

    render() {
        return (
            <div className="Products">
                {this.state.products.map(item => (
                    <Link key={item.id} className="Products__item" to={`/product/${item.id}/${item.slug}`}>
                        <img src={item.img} alt={item.name} className="Products__item__img"/>
                        <h3 className="Products__item__name">
                            {item.name}
                        </h3>
                        <p className="Products__item__price">
                            {formatPrice(item.price, this.props.context.price)}
                        </p>
                    </Link>
                ))}
            </div>
        );
    }
}
