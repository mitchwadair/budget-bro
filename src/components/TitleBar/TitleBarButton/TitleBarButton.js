import React from 'react';
import settings from '../../../settings';

import './titlebarbutton.scss';

const {prefix} = settings;

export default function TitleBarButton({func, icon}) {
    return (
        <div className={`${prefix}-title-bar-button`} onClick={func}>
            <div className={`${prefix}-title-bar-button-image`} style={{'--url': `url(${icon}`}}/>
        </div>
    );
}