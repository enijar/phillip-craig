import React, {Component, createRef} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import Request from "../app/Http/Request";
import Errors from "./Errors";
import Message from "./Message";

export default class Form extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        method: PropTypes.oneOf(['get', 'post', 'patch', 'delete']),
        data: PropTypes.object,
        onSubmit: PropTypes.func,
        verifyCaptcha: PropTypes.bool,
    };

    static defaultProps = {
        method: 'get',
        verifyCaptcha: false,
    };

    captcha = createRef();

    state = {
        submitting: false,
        errors: [],
        message: null,
        captcha: '',
    };

    async submit() {
        const data = this.props.data;

        if (this.props.verifyCaptcha) {
            data.captcha = this.state.captcha;
        }

        const res = await Request[this.props.method](this.props.endpoint, data);
        await this.setState({errors: res.errors, message: res.message, submitting: false});

        if (this.props.onSubmit) {
            this.props.onSubmit(res);
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.state.submitting) {
            return;
        }

        await this.setState({errors: [], message: null, submitting: true});

        if (this.props.verifyCaptcha && !this.state.captcha) {
            return this.captcha.current.execute();
        }

        return this.submit();
    };

    setCaptcha = async captcha => {
        this.setState({captcha});
        return this.submit();
    };

    render() {
        return (
            <form
                className={`Form ${this.state.submitting ? 'Form--processing' : ''}`}
                onSubmit={this.handleSubmit}
                noValidate
            >
                <Errors errors={this.state.errors}/>
                <Message message={this.state.message}/>

                <div className="Form__fields">
                    {this.props.children}

                    {this.props.verifyCaptcha && (
                        <ReCAPTCHA
                            size="invisible"
                            ref={this.captcha}
                            sitekey={window.APP.reCaptchaSiteKey}
                            onChange={this.setCaptcha}
                        />
                    )}
                </div>
            </form>
        );
    }
}
