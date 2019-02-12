import React from "react";
import {asset} from "../app/utils";

export default function BackgroundVideo(props) {
    return (
        <div className="BackgroundVideo">
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
