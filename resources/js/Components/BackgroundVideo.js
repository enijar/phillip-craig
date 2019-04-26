import React from "react";
import PropTypes from "prop-types";
import {asset} from "../app/utils";

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
                <video muted autoPlay loop playsInline placeholder={asset('vid/background-placeholder.jpg')}>
                    <source src={asset('vid/background.webm')} type="video/webm"/>
                    <source src={asset('vid/background.mp4')} type="video/mp4"/>
                </video>
            </div>

            <div className="BackgroundVideo__content">
                {props.children}
            </div>
        </div>
    );
}
