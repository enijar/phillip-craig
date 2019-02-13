import React, {createRef} from "react";
import ReCaptcha from "react-google-recaptcha";
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
        captcha: '',
    },
};

const MAX_CAPTCHA_RESETS = 5;

export default class SubscriptionScreen extends BaseScreen {
    state = JSON.parse(JSON.stringify(INITIAL_STATE));

    captcha = createRef();

    captchaResets = 0;

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

    updateCaptcha = captcha => {
        const {data} = this.state;
        data.captcha = captcha;
        return this.setState({data});
    };

    resetCaptcha = async () => {
        console.log('resetCaptcha');

        this.captchaResets++;

        if (this.captchaResets === MAX_CAPTCHA_RESETS) {
            this.captchaResets = MAX_CAPTCHA_RESETS;
            return;
        }

        await this.updateCaptcha();

        if (this.captcha.current) {
            this.captcha.current.reset();
        }
    };

    render() {
        console.log('window.APP.reCaptchaSiteKey', window.APP.reCaptchaSiteKey);

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
                        rules={{
                            email: 'required|email|max:255',
                            captcha: 'required',
                        }}
                        messages={{
                            email: {
                                email: 'Please enter a valid email',
                                required: 'Please enter your email',
                                max: 'Too long, please make 255 or less',
                            },
                            captcha: {
                                required: "Please prove you're not a robot",
                            },
                        }}
                    >
                        <div className="Form__input">
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Enter Your Email"
                                onChange={this.handleChange}
                                value={this.state.data.email}
                            />
                            <ReCaptcha
                                ref={this.captcha}
                                sitekey={window.APP.reCaptchaSiteKey}
                                onChange={this.updateCaptcha}
                                className="Form__captcha"
                                onExpired={this.resetCaptcha}
                                onErrored={this.resetCaptcha}
                            />
                        </div>
                        <Button type="submit">subscribe</Button>
                    </Form>

                    <p>Subscribe to out mailing list to be notified when our F/W 19 collection lands!</p>
                </BackgroundVideo>
            </Screen>
        );
    }
}
