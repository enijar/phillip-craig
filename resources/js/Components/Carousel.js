import React, {Component} from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";

const DEFAULT_SETTINGS = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default class Carousel extends Component {
    static Item = props => (
        <div className="Carousel__item">
            {props.children}
        </div>
    );

    static propTypes = {
        settings: PropTypes.object,
    };

    static defaultProps = {
        settings: DEFAULT_SETTINGS,
    };

    render() {
        return (
            <div className="Carousel">
                <Slick {...this.props.settings}>
                    {this.props.children}
                </Slick>
            </div>
        );
    }
}
