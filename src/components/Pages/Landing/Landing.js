import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {remote} from 'electron';
import fs from 'fs';
import path from 'path';
import './landing.scss'

import { devLog } from '../../../utils';
import settings from '../../../settings';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';

const {prefix} = settings;

export default function Landing(props) {
    const [profiles, setProfiles] = useState(null);
    const history = useHistory();

    const getProfiles = () => {
        const currentDir = remote.app.getAppPath();
        const dataDir = path.join(currentDir, "data");
        console.log(dataDir);
        if (fs.existsSync(dataDir)) {
            devLog("data dir exists, loading profiles...");
            const contents = fs.readdirSync(dataDir);
            if (contents.length > 0) {
                devLog("profiles exist, loading...");
            } else {
                devLog("no profiles exist");
            }
        } else {
            devLog("data dir not found. creating new one...")
            fs.mkdirSync(dataDir);
        }
    };

    const buttonOnClick = () => {
        history.push("/createProfile");
    }

    getProfiles();

    const content = profiles === null ? <div>
            <div style={{padding: '15px'}}>It looks like there are no budgeting profiles created on this machine!</div>
            <Button onClick={buttonOnClick}>Create a Profile</Button>
        </div> : <div>
            profiles
        </div>;

    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            <div className={`${prefix}-landing-page-title`}>Budget Bro</div>
            {content}
        </Page>
    );
}