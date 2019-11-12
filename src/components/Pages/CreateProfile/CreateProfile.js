import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './createprofile.scss'

import { devLog } from '../../../utils';
import settings from '../../../settings';
import stateOptions from './states.json';

import Page from '../Page';
import Logo from '../../Logo/Logo';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';
import Dropdown from '../../Dropdown/Dropdown';

const {prefix} = settings;

export default function CreateProfile(props) {
    const history = useHistory();
    const [inputData, setInputData] = useState({
        'income_type': 'salary',
        'home_state': 'AL',
        'filing_status': 'single',
    });
    
    const goBack = () => {
        history.push("/");
    }

    const submit = () => {
        console.log(inputData);
    }

    const setInputValue = (data, key) => {
        setInputData({...inputData, [key]: data})
    }

    const incomeTypeOptions = [
        {value: "salary", label: "Annual Salary"},
        {value: "hourly", label: "Hourly Wage"},
    ];

    const filingStatusOptions = [
        {value: "single", label: "Single"},
        {value: "married", label: "Married"},
        {value: "married separately", label: "Married Separately"},
        {value: "head of household", label: "Head of Household"},
    ];

    const incomeInput = inputData.income_type === "salary" ? 
        <TextInput label="Annual Income" callback={setInputValue} id="annual_income"/>
        :
        <>
            <TextInput label="Hourly Wage" callback={setInputValue} id="hourly_wage"/>
            <TextInput label="Expected Hours per Week" callback={setInputValue} id="work_hours"/>
        </>;
    
    return (
        <Page>
            <Logo width={'100px'} height={'100px'}/>
            Create Profile
            <div className={`${prefix}-pc-input-container`}>
                <TextInput label="Profile Name" callback={setInputValue} id="profile_name"/>
                <Dropdown label="Income Type" options={incomeTypeOptions} callback={setInputValue} id="income_type"/>
                {incomeInput}
                <TextInput label="Expected Additional Income" callback={setInputValue} id="additional_income"/>
                <Dropdown label="Home State" options={stateOptions} callback={setInputValue} id="home_state"/>
                <Dropdown label="Tax Filing Status" options={filingStatusOptions} callback={setInputValue} id="filing_status"/>
            </div>
            <div className={`${prefix}-pc-button-container`}>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={submit}>Submit</Button>
            </div>
        </Page>
    );
}