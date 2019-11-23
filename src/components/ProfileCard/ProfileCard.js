import React from 'react';
import settings from '../../settings';
import fs from 'fs';
import path from 'path';
import {remote} from 'electron';

import './profilecard.scss';

const {prefix} = settings;

export default function ProfileCard({onClick, profileFolder}) {
    const currentDir = remote.app.getAppPath();
    const dataDir = path.join(currentDir, "data");
    const profileDir = path.join(dataDir, profileFolder);
    const profileData = JSON.parse(fs.readFileSync(path.join(profileDir, "profile_data.json")));
    const name = profileData.profile_name;
    
    return (
        <div className={`${prefix}-profile-card`} onClick={onClick}>
            {name}
        </div> 
    );
}