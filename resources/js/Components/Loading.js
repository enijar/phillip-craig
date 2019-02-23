import React, {Component} from "react";
import {createPortal} from "react-dom";

const MIN_DOTS = 1;
const MAX_DOTS = 3;
const DOTS_UPDATE_DELAY = 300;

const DIRECTIONS = {
    [MIN_DOTS]: 1,
    [MAX_DOTS]: -1,
};

export default class Loading extends Component {
    mountNode = document.querySelector('#root-loading');

    timeout = null;

    state = {
        dots: 0,
        direction: 1,
    };

    componentDidMount() {
        this.updateDots();
    }

    componentWillUnmount() {
        if (this.timeout !== null) {
            this.timeout = clearTimeout(this.timeout);
        }
    }

    updateDots = () => {
        let {dots, direction} = this.state;
        dots = dots + direction;
        if (DIRECTIONS.hasOwnProperty(dots)) {
            direction = DIRECTIONS[dots];
        }
        this.setState({dots, direction});

        this.timeout = setTimeout(this.updateDots, DOTS_UPDATE_DELAY);
    };

    render() {
        return createPortal((
            <div className="Loading">
                Loading{'.'.repeat(this.state.dots)}
            </div>
        ), this.mountNode);
    }
}
