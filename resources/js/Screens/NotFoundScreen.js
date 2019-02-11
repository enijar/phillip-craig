import React from "react";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";

export default class NotFoundScreen extends BaseScreen {
    render() {
        return (
            <Screen name="NotFound">
                <h1>404 Page not Found</h1>
            </Screen>
        );
    }
}
