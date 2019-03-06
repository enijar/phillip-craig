import React from "react";
import {asset} from "../app/utils";
import ProductFactory from "../app/Factories/ProductFactory";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Title from "../Components/Title";

const CAROUSEL_ITEMS = [];

for (let i = 0; i < 4; i++) {
    CAROUSEL_ITEMS.push(asset('img/carousel/0.jpg'));
}

export default class ProductScreen extends BaseScreen {
    state = {
        product: ProductFactory(),
    };

    render() {
        return (
            <Screen name="Home">
                <Header/>
                <Nav/>

                <Title>{this.state.product.name}</Title>
            </Screen>
        );
    }
}
