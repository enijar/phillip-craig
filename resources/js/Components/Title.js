import React from "react";

export default function Title(props) {
    return (
        <div className="Title">
            <h1>{props.children}</h1>
        </div>
    );
}
