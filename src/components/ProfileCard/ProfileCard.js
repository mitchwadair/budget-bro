import React from 'react';
import settings from '../../settings';
import fs from 'fs';
import path from 'path';
import {remote} from 'electron';

import './profilecard.scss';

const {prefix} = settings;

export default function ProfileCard({onClick, profileFolder}) {
    const hasProfile = profileFolder !== null;
    const currentDir = remote.app.getAppPath();
    const dataDir = path.join(currentDir, "data");
    const profileDir = hasProfile ? path.join(dataDir, profileFolder) : null;
    const profileData = hasProfile ? JSON.parse(fs.readFileSync(path.join(profileDir, "profile_data.json"))) : null;
    const name = hasProfile ? profileData.profile_name : "Create New Profile";
    
    return (
        <div className={`${prefix}-profile-card`} onClick={onClick}>
            <div className={`${prefix}-profile-card-icon-container`}>
                <div className={`${prefix}-profile-card-icon ${(hasProfile ? "user" : "add")}`}/>
            </div>
            <div className={`${prefix}-profile-card-info-container`}>
                {name}
            </div>
        </div> 
    );
}