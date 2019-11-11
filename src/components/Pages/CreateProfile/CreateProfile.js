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
    const [inputData, setInputData] = useState({});
    
    const goBack = () => {
        history.push("/");
    }

    const submit = () => {
        console.log(inputData);
    }

    const setInputValue = (data, key) => {
        setInputData({...inputData, [key]: data})
    }
    
    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            Create Profile
            <div className={`${prefix}-pc-input-container`}>
                <TextInput label="Profile Name" callback={setInputValue} id="profile_name"/>
                <TextInput label="Annual Income" callback={setInputValue} id="annual_income"/>
            </div>
            <div className={`${prefix}-pc-button-container`}>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={submit}>Submit</Button>
            </div>
        </Page>
    );
}