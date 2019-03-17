import React, {Component} from "react";
import PropTypes from "prop-types";

export default class QuantityPicker extends Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.number,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        min: 1,
        max: 10,
        value: 1,
    };

    decrement = () => {
        if (this.props.onChange) {
            this.props.onChange(Math.max(this.props.min, this.props.value - 1));
        }
    };

    increment = () => {
        if (this.props.onChange) {
            this.props.onChange(Math.min(this.props.max, this.props.value + 1));
        }
    };

    render() {
        return (
            <div className="QuantityPicker">
                <button onClick={this.decrement}>-</button>
                <div className="QuantityPicker__value">
                    {this.props.value}
                </div>
                <button onClick={this.increment}>+</button>
            </div>
        );
    }
}
