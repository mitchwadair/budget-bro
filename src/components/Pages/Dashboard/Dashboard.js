import React, {useState, useLayoutEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {remote} from 'electron';
import fs from 'fs';
import path from 'path';
import './dashboard.scss'

import { devLog } from '../../../utils';
import settings from '../../../settings';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';

const {prefix} = settings;

export default function Dashboard(props) {
    const profileFolder = props.match.params.id;
    const history = useHistory();
    const currentDir = remote.app.getAppPath();
    const dataDir = path.join(currentDir, 'data');
    const profileDataDir = path.join(dataDir, profileFolder);
    const profileData = JSON.parse(fs.readFileSync(path.join(profileDataDir, "profile_data.json")));
    const date = new Date();

    return (
        <Page>
            <div className={`${prefix}-dashboard-title`}><Logo width={'7rem'} height={'7rem'}/><span>Dashboard</span></div>
            <div className={`${prefix}-dashboard-name`}>{profileData.profile_name}</div>
            <div>{date.toString()}</div>
            <Button onClick={() => {history.push('/')}}>Go Back</Button>
        </Page>
    );
}