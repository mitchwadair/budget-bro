import React from 'react';
import settings from '../../../settings';

import './titlebaricon.scss';

const {prefix} = settings;

export default function TitleBarIcon({icon}) {
    return (
        <div className={`${prefix}-title-bar-icon`}>
            <div className={`${prefix}-title-bar-icon-image`} style={{'--url': `url(${icon}`}}/>
        </div>
    );
}