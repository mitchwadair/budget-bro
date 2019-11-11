import React from 'react';
import settings from '../../settings';

import './logo.scss';

const {prefix} = settings;

export default function Logo({width, height}) {

    return (
        <div className={`${prefix}-logo`} style={{'--width': width, '--height': height}}/>
    );
}