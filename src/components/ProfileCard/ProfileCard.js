import React from 'react';
import settings from '../../settings';
import fs from 'fs';

import './profilecard.scss';

const {prefix} = settings;

export default function ProfileCard({onClick, profileFolder}) {
    
    
    return (
        <div className={`${prefix}-profile-card`} onClick={onClick}>
            card
        </div> 
    );
}