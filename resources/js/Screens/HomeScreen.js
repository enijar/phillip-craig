import React from "react";
import {asset} from "../app/utils";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Carousel from "../Components/Carousel";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Title from "../Components/Title";
import Items from "../Components/Items";
import ScrollIndicator from "../Components/ScrollIndicator";

const CAROUSEL_ITEMS = [];
const ITEMS = [];

for (let i = 0; i < 4; i++) {
    CAROUSEL_ITEMS.push(asset('img/carousel/0.png'));
}

for (let i = 0; i < 6; i++) {
    ITEMS.push({
        id: i + 1,
        img: asset('img/items/0.png'),
        name: 'Bubblegum Block Hoodie',
        price: 5500,
    });
}

export default class HomeScreen extends BaseScreen {
    render() {
        return (
            <Screen name="Home">
                <Header/>
                <Nav/>

                <Carousel>
                    {CAROUSEL_ITEMS.map((item, index) => (
                        <Carousel.Item key={`carousel-item-${index}`}>
                            <img src={item} alt={`Carousel item ${index + 1}`} className="img-responsive"/>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <Title>Shop</Title>

                <Items items={ITEMS}/>

                <ScrollIndicator direction="down"/>
            </Screen>
        );
    }
}
