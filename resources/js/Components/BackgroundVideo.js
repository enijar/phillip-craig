import React from "react";
import PropTypes from "prop-types";
import {cdn} from "../app/utils";

BackgroundVideo.propTypes = {
    mode: PropTypes.string,
};

BackgroundVideo.defaultProps = {
    mode: 'normal',
};

export default function BackgroundVideo(props) {
    return (
        <div className={`BackgroundVideo BackgroundVideo--${props.mode}`}>
            <div className="BackgroundVideo__video">
                <video muted autoPlay loop playsInline placeholder={cdn('background-placeholder.jpg')}>
                    <source src={cdn('background.webm')} type="video/webm"/>
                    <source src={cdn('background.mp4')} type="video/mp4"/>
                </video>
            </div>

            <div className="BackgroundVideo__content">
                {props.children}
            </div>
        </div>
    );
}
