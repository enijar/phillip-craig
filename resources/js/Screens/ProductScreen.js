import React from "react";
import {formatPrice} from "../app/utils";
import ProductFactory from "../app/Factories/ProductFactory";
import AppContext from "../app/AppContext";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Title from "../Components/Title";
import SizePicker from "../Components/SizePicker";
import QuantityPicker from "../Components/QuantityPicker";
import Button from "../Components/Button";

@AppContext
export default class ProductScreen extends BaseScreen {
    state = {
        product: ProductFactory(),
    };

    handleSizeChange = size => {
        const {product} = this.state;
        product.size = size;
        this.setState({product});
    };

    handleQuantityChange = quantity => {
        const {product} = this.state;
        product.quantity = quantity;
        this.setState({product});
    };

    render() {
        return (
            <Screen name="Product">
                <Header/>
                <Nav/>

                <Title>{this.state.product.name}</Title>

                <div className="Product content content--medium">
                    <div className="Product__preview">
                        <img src={this.state.product.preview} alt="Preview" className="img-responsive"/>
                    </div>

                    <div className="Product__info">
                        <h2>{this.state.product.name}</h2>
                        <h2 className="Product__price">
                            {formatPrice(this.state.product.price, this.props.context.price)}
                        </h2>

                        <h3>Size</h3>
                        <SizePicker onChange={this.handleSizeChange} value={this.state.product.size}/>

                        <h3>Quantity</h3>
                        <QuantityPicker onChange={this.handleQuantityChange} value={this.state.product.quantity}/>

                        <Button cart>Add to Cart</Button>

                        <p className="Product__description">
                            <strong>Description</strong>
                            <br/>
                            {this.state.product.description}
                        </p>
                    </div>
                </div>
            </Screen>
        );
    }
}
