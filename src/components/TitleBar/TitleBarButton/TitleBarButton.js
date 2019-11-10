import React from 'react';

import './titlebarbutton.scss';

export default function TitleBarButton({func, icon, color="black"}) {

    return (
        <div className={"bb-title-bar-button"} onClick={func}>
            <div className={"bb-title-bar-button-image"} style={{'--url': `url(${icon}`, '--color': color}}/>
        </div>
    );
}