import React, {useState} from "react";
import PropTypes from "prop-types";
import Request from "../app/Http/Request";

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

    const handleSubmit = async event => {
        event.preventDefault();

        if (submitting) {
            return;
        }

        setSubmitting(true);

        const res = await Request[props.method](props.endpoint, props.data);

        console.log(res);

        setSubmitting(false);
    };

    return (
        <form className="Form" onSubmit={handleSubmit}>
            {props.children}
        </form>
    );
}
