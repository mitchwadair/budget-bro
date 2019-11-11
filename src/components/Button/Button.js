import React from 'react';

import './button.scss';

export default function Button({onClick, label}) {
    return (
        <div className={"bb-button"} onClick={onClick}>{label}</div>
    );
}