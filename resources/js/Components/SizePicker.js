import React, {Component} from "react";
import PropTypes from "prop-types";

export default class SizePicker extends Component {
    static propTypes = {
        sizes: PropTypes.array,
        selected: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
    };

    static defaultProps = {
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    };

    handleClick = size => () => {
        if (this.props.onChange) {
            this.props.onChange(size);
        }
    };

    render() {
        return (
            <div className="SizePicker">
                {this.props.sizes.map((size, index) => (
                    <div
                        key={`size-${index}`}
                        className={`
                            SizePicker__size
                            ${this.props.value === size ? 'SizePicker__size--selected' : ''}
                        `}
                        onClick={this.handleClick(size)}
                    >
                        {size}
                    </div>
                ))}
            </div>
        );
    }
}
