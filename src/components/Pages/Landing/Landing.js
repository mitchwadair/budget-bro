import React, {useState} from 'react';
import {remote} from 'electron';
import fs from 'fs';
import path from 'path';
import './landing.scss'

import { devLog } from '../../../utils.js';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';

export default function Landing(props) {
    const [profiles, setProfiles] = useState(null);

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
        devLog("button clicked");
    }

    getProfiles();

    const content = profiles === null ? <div>
            <div style={{padding: '15px'}}>It looks like there are no budgeting profiles created on this machine!</div>
            <Button onClick={buttonOnClick} label={"Create a Profile"}/>
        </div> : <div>
            profiles
        </div>;

    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            <div className={"bb-landing-page-title"}>Budget Bro</div>
            {content}
        </Page>
    );
}