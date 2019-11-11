import React from 'react';

import './logo.scss';

export default function Logo({width, height}) {

    return (
        <div className={"bb-logo"} style={{'--width': width, '--height': height}}/>
    );
}