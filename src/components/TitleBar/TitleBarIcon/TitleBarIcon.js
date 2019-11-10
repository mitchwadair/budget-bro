import React from 'react';

import './titlebaricon.scss';

export default function TitleBarIcon({icon}) {
    return (
        <div className={"bb-title-bar-icon"}>
            <div className={"bb-title-bar-icon-image"} style={{'--url': `url(${icon}`}}/>
        </div>
    );
}