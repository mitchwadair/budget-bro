import React from 'react';
import settings from '../../settings';

import './content.scss';

const {prefix} = settings;

export default function Content({children}) {

    return (
        <div className={`${prefix}-content`}>
            {children}
        </div>
    );
}