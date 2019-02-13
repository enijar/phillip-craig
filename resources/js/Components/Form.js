import React, {Component} from "react";
import PropTypes from "prop-types";
import Validation from "fv-validation";
import Request from "../app/Http/Request";
import Errors from "./Errors";
import Message from "./Message";

export default class Form extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        method: PropTypes.oneOf(['get', 'post', 'patch', 'delete']),
        data: PropTypes.object,
        onSubmit: PropTypes.func,
        rules: PropTypes.object,
        messages: PropTypes.object,
    };

    static defaultProps = {
        method: 'get',
    };

    validation = new Validation();

    state = {
        submitting: false,
        errors: [],
        message: null,
        rules: {},
        messages: {},
    };

    async submit() {
        await this.setState({errors: [], message: null, submitting: true});

        const res = await Request[this.props.method](this.props.endpoint, this.props.data);

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

        this.validation.validate(this.props.data, this.props.rules, this.props.messages);
        const errors = this.validation.getErrors();

        if (errors.length > 0) {
            // Show first error
            return this.setState({errors: [errors[0]], submitting: false});
        }

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
                </div>
            </form>
        );
    }
}
