import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './createprofile.scss'

import { devLog } from '../../../utils';
import settings from '../../../settings';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';

const {prefix} = settings;

export default function CreateProfile(props) {
    const history = useHistory();
    
    const goBack = () => {
        history.push("/");
    }
    
    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            Create Profile
            <div className={`${prefix}-pc-input-container`}>
                <TextInput label="Profile Name"/>
                <TextInput label="Annual Income"/>
            </div>
            <div className={`${prefix}-pc-button-container`}>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={() => {devLog("submit clicked")}}>Submit</Button>
            </div>
        </Page>
    );
}