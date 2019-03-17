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

@AppContext
export default class ProductScreen extends BaseScreen {
    state = {
        product: ProductFactory(),
        size: 'M',
    };

    handleSizeSelect = size => {
        this.setState({size});
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
                        <SizePicker onSelect={this.handleSizeSelect} selected={this.state.size}/>
                    </div>
                </div>
            </Screen>
        );
    }
}
