import React, {useState} from "react";
import PropTypes from "prop-types";
import Request from "../app/Http/Request";
import Errors from "./Errors";
import Message from "./Message";

Form.propTypes = {
    endpoint: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['get', 'post', 'patch', 'delete']),
    data: PropTypes.object,
    onSubmit: PropTypes.func,
};

Form.defaultProps = {
    method: 'get',
};

export default function Form(props) {
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState(null);

    const handleSubmit = async event => {
        event.preventDefault();

        if (submitting) {
            return;
        }

        setErrors([]);
        setMessage(null);
        setSubmitting(true);

        const res = await Request[props.method](props.endpoint, props.data);

        setErrors(res.errors);
        setMessage(res.message);
        setSubmitting(false);
    };

    return (
        <form className={`Form ${submitting ? 'Form--processing' : ''}`} onSubmit={handleSubmit} noValidate>
            <Errors errors={errors}/>
            <Message message={message}/>

            <div className="Form__fields">
                {props.children}
            </div>
        </form>
    );
}
