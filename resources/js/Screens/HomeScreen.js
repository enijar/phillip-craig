import React from "react";
import {asset} from "../app/utils";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Carousel from "../Components/Carousel";
import Nav from "../Components/Nav";

const CAROUSEL_ITEMS = [
    asset('img/carousel/0.png'),
    asset('img/carousel/0.png'),
    asset('img/carousel/0.png'),
    asset('img/carousel/0.png'),
];


export default class HomeScreen extends BaseScreen {
    render() {
        return (
            <Screen name="Home">
                <Nav/>

                <Carousel>
                    {CAROUSEL_ITEMS.map((item, index) => (
                        <Carousel.Item key={`carousel-item-${index}`}>
                            <img src={item} alt={`Carousel item ${index + 1}`} className="img-responsive"/>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Screen>
        );
    }
}
