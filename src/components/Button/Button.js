import React from 'react';
import settings from '../../settings';

import './button.scss';

const {prefix} = settings;

export default function Button({onClick, children}) {
    return (
        <div className={`${prefix}-button`} onClick={onClick}>{children}</div>
    );
}