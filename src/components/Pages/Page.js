import React from 'react';
import settings from '../../settings';

import './page.scss'

const {prefix} = settings;

export default function Page({children}) {
    return (
        <div className={`${prefix}-page`}>
            <div className={`${prefix}-page-spacing-top`}/>
            {children}
            <div className={`${prefix}-page-spacing-bottom`}/>
        </div>
    );
}