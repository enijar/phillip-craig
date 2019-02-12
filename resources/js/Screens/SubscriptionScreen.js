import React from "react";
import {asset, route} from "../app/utils";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import BackgroundVideo from "../Components/BackgroundVideo";
import Divider from "../Components/Divider";
import Form from "../Components/Form";
import Button from "../Components/Button";

const INITIAL_STATE = {
    data: {
        email: '',
    },
};

export default class SubscriptionScreen extends BaseScreen {
    state = JSON.parse(JSON.stringify(INITIAL_STATE));

    handleChange = event => {
        const {data} = this.state;
        data[event.target.name] = event.target.value;
        this.setState({data});
    };

    handleSubmit = res => {
        if (res.success) {
            this.setState(JSON.parse(JSON.stringify(INITIAL_STATE)));
        }
    };

    render() {
        return (
            <Screen name="Subscription">
                <BackgroundVideo mode="dark">
                    <img src={asset('img/logo.svg')} alt="Logo" className="logo img-responsive"/>

                    <Divider/>

                    <Form
                        endpoint={route('api.subscribe')}
                        method="post"
                        data={this.state.data}
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter Your Email"
                            onChange={this.handleChange}
                            value={this.state.data.email}
                        />
                        <Button type="submit">subscribe</Button>
                    </Form>

                    <p>
                        Subscribe to be notified when we drop a line.
                    </p>
                </BackgroundVideo>
            </Screen>
        );
    }
}
