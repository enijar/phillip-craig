import React, {Component} from "react";
import PropTypes from "prop-types";

export default class SizePicker extends Component {
    static propTypes = {
        sizes: PropTypes.array,
        selected: PropTypes.string,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    };

    handleClick = size => () => {
        if (this.props.onSelect) {
            this.props.onSelect(size);
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
                            ${this.props.selected === size ? 'SizePicker__size--selected' : ''}
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
