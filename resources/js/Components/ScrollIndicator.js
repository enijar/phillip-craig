import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {asset} from "../app/utils";

ScrollIndicator.propTypes = {
    direction: PropTypes.oneOf(['down', 'right', 'up', 'left']),
    scrollElement: PropTypes.object,
};

ScrollIndicator.defaultProps = {
    direction: 'down',
    scrollElement: document.querySelector('#root-app'),
};

export default function ScrollIndicator(props) {
    const [show, setShow] = useState(true);

    const handleScroll = () => setShow(false);

    useEffect(() => {
        props.scrollElement.addEventListener('scroll', handleScroll);
        return () => props.scrollElement.addEventListener('scroll', handleScroll);
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className={`ScrollIndicator ScrollIndicator--${props.direction}`}>
            <img src={asset('img/arrow.svg')} alt={`Scroll ${props.direction}`}/>
        </div>
    );
}
