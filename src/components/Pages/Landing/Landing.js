import React, {useState, useLayoutEffect} from 'react';
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
import ProfileCard from '../../ProfileCard/ProfileCard';

const {prefix} = settings;

export default function Landing(props) {
    const [profiles, setProfiles] = useState(null);
    const history = useHistory();
    useLayoutEffect(() => {
        getProfiles();
    }, [])

    const getProfiles = () => {
        const currentDir = remote.app.getAppPath();
        const dataDir = path.join(currentDir, "data");
        console.log(dataDir);
        if (fs.existsSync(dataDir)) {
            devLog("data dir exists, loading profiles...");
            const contents = fs.readdirSync(dataDir);
            if (contents.length > 0) {
                devLog("profiles exist, loading...");
                const profilesToSet = contents.map((item) => {
                        const itemPath = path.join(dataDir, item);
                        if (fs.lstatSync(itemPath).isDirectory()) {
                            return itemPath;
                        }
                    });
                setProfiles(profilesToSet);
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

    const content = profiles === null ? <div>
            <div style={{padding: '15px'}}>It looks like there are no budgeting profiles created on this machine!</div>
            <Button onClick={buttonOnClick}>Create a Profile</Button>
        </div> : <div>
            {profiles.map((profile) => {
                return <ProfileCard onClick={console.log("profile clicked")} profileFolder={profile}/>
            })}
        </div>;

    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            <div className={`${prefix}-landing-page-title`}>Budget Bro</div>
            <div className={`${prefix}-landing-page-profiles-container`}>
                {content}
            </div>
        </Page>
    );
}